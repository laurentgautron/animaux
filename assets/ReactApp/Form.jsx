import React, {useState, useEffect, useCallback, useRef} from "react";
import {inputFields} from './datas'
import {initFunction, makeUrl, datasForRequest, validation} from './utils'
import AnimalCard from "./AnimalCard";
import HelloApp from "./HelloApp";

export function Form (props) {
    
    const {submitText, initForm} = initFunction(props)
    
    const useToggle = (initialValue) => {
        const [value, setValue] = useState(initialValue)
        const toggle = useCallback( () => {
            setValue( v => !v)
        }, [])
        return [value, toggle]
    }
    
    const [simpleResearch, toggleResearch] = props.context === 'edition' || props.context === 'creation' ? useToggle(false) : useToggle(true)
    
    const [form, setForm] = useState({
        ...initForm,
    })
    const [formError, setFormError] = useState({
        ...initForm,
    })
    const [options, setOptions] = useState({})
    const text = submitText
    const [animalChange, setAnimalChange] = useState(false)
    const [showList, setShowList] = useState(false)
    const [error, setError] = useState()

    const extractDatasSelect = (datas) => {
        let arrayDatas = []
        for ( const data of datas) {
            // nem key in data
            const name = data["@type"].toLowerCase() + "Name"
            // iri
            arrayDatas.push([data["@id"], data[name]])
        }
        return arrayDatas
    }

    const Select = () => {
        return ( <div>
            {inputFields["select"].map( item => {
                return <div key={item["finalEntity"]}>
                        {item["context"].includes(props.context) &&
                        <label htmlFor={item["table"]} key={item["table"]}>
                        {item["table"]}
                        <select name={item["primaryEntity"]}
                                key={item["primaryEntity"]} 
                                value={form[item.primaryEntity]} 
                                onChange={handleChange}
                                multiple={item.multiple}>
                            <option value=""></option>
                            {options[item["primaryEntity"]] && options[item["primaryEntity"]].map( op => <option value={op[0]} key={op[0]}>{op[1]}</option>)}
                        </select>
                    </label>}
                </div>
            })}
        </div>
        )  
    }

    for (const select of inputFields["select"]) {
        useEffect ( () => {
            fetch('api/' + select["table"])
            .then( response => response.json())
            .then( 
                result => {
                    setOptions( state => ({...state, [select["primaryEntity"]]: extractDatasSelect(result["hydra:member"])}))
                },
                error => setError(error)
                )
        }, [])
    }

    const handleChange = (ev) => {
        if (ev.target.multiple) {
            const {name, selectedOptions} = ev.target
            setForm ( state => ({
                ...state, [name]: Array.from(selectedOptions, option => option.value)
            }))
        } else {
            const { name, value }  = ev.target
            console.log('la value rentrée: ', value)
            setForm( state => ({
                ...state, [name]: value
            }))
        }
    }

    const buttonToogle = !simpleResearch ? 
                        <button onClick={toggleResearch}>simple recherche</button> : 
                        <button onClick={toggleResearch}>recherche détaillée</button>

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (props.context === "fullResearch") {
            //make an url and pass url in HelloApp
            props.onResult(makeUrl(form))
        } else if (props.context === 'creation') {
            try {
                fetch('/api/animals', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json'
                    },
                    body: JSON.stringify(datasForRequest(form, 'creation'))
                })
                .then (response => {
                    console.log('response status: ', response.status)
                    if (response.status === 422) {
                        return  response.json()
                    } else {
                        console.log('des erreurs: ', response.status, response.statusText)
                        return response.json()
                    }
                })
                .then(resp => {
                    if (validation(resp, formError)) {
                        setShowList(l => !l)
                    }
                })
            } catch(error) {
                console.log('il y a une erreur: ', error)
            }
        } else {
            // const animalId = props.animalId.split('/')
            // const id = animalId[animalId.length - 1]
            fetch(props.animalId, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                },
                body: JSON.stringify(datasForRequest(form, 'modification'))
            })
            .then(response => response.json())
            .then(resp => {
                if (resp.violations) {
                    console.log(resp.violations)
                }
                setShowList(a=> !a)
            })
        }
    }

    return (<div>
        {!animalChange && !showList && <form onSubmit={handleSubmit}>
        {inputFields["text"].map( item => {
            return <div key={item['finalEntity']}>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <input type="text" name={item["finalEntity"]} value={form[item.finalEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        {!simpleResearch && inputFields["textarea"].map( item => {
            return <div key={item['finalEntity']}>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <textarea name={item["finalEntity"]} value={form[item.finalEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        {!simpleResearch && <Select />}
        {props.context === 'fullResearch' && buttonToogle}
        <button type="submit">{text}</button>
    </form>}
    {animalChange && <AnimalCard animalId={props.animalId} />}
    {showList && <HelloApp />}
    </div>)
     
}
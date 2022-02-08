import React, {useState, useEffect, useCallback} from "react";
import {inputFields} from './datas'
import {initFunction, makeUrl, datasForRequest, validation, init} from './utils'
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
    
    const [form, setForm] = useState(initForm)
    const [Errors, setErrors] = useState(init(inputFields, 'primaryEntity'))
    const [options, setOptions] = useState({})
    const text = submitText
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
                        <span>{Errors[item.primaryEntity]}</span>
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
                console.log('la forme pour initiale: ', form)
                console.log('la forme preparée: ', datasForRequest(form, 'creation'))
                console.log('la forme apres preparation: ', form)
                fetch('/api/animals', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json'
                    },
                    body: JSON.stringify(datasForRequest(form, 'creation'))
                })
                .then (response => {
                    console.log('response status: ', response.status)
                    console.log('la form apres la reponse: ', form)
                    if (response.status === 422) {
                        return  response.json()
                    } else {
                        console.log('des erreurs: ', response.status, response.statusText)
                        return response.json()
                    }
                })
                .then(resp => {
                    console.log('la resp: ', resp)
                    if (resp.violations) {
                        console.log('il y a des violations')
                        setErrors(validation(resp))
                    } else {
                        setShowList(l => !l)
                    }
                })
            } catch(error) {
                console.log('il y a une erreur: ', error)
            }
        } else {
            console.log('la form pour le patch: ', form)
            fetch(props.animalId, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                },
                body: JSON.stringify(datasForRequest(form, 'edition'))
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

    console.log('le formError: ', Errors)
    console.log('lea form: ', form)
    console.log('le context de formulaire: ', props.context)
    console.log('le initform: ', initForm)

    return (<div>
        {!showList && <form onSubmit={handleSubmit}>
        {inputFields["text"].map( item => {
            return <div key={item['finalEntity']}>
                <span>{Errors[item.primaryEntity]}</span>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <input type="text" name={item["finalEntity"]} value={form[item.finalEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        {!simpleResearch && inputFields["textarea"].map( item => {
            return <div key={item['finalEntity']}>
                <span>{Errors[item.primaryEntity]}</span>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <textarea name={item["finalEntity"]} value={form[item.finalEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        {!simpleResearch && <Select />}
        {props.context === 'fullResearch' && buttonToogle}
        <button type="submit">{text}</button>
    </form>}
    {showList && <HelloApp />}
    </div>)
     
}
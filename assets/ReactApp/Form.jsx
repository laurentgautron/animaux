import React, {useState, useEffect, useCallback} from "react";
import {Animal, WorldPopulation} from './datas'
import {initFunction, makeUrl, datasForRequest, validation, init, contextFields} from './utils'
import HelloApp from "./HelloApp";

export function Form (props) {
    
 

    const fields = contextFields(props.field)

    const submitText = (props.context === 'edition' || props.context === 'creation') ? "enregistrer" : "rechercher"
    
    const useToggle = (initialValue) => {
        const [value, setValue] = useState(initialValue)
        const toggle = useCallback( () => {
            setValue( v => !v)
        }, [])
        return [value, toggle]
    }
    
    const [simpleResearch, toggleResearch] = props.context === 'edition' || props.context === 'creation' ? useToggle(false) : useToggle(true)
    
    const [form, setForm] = useState(initFunction(props))
    const [formErrors, setFormErrors] = useState(init(Animal, 'primaryEntity'))
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
            {fields["select"].map( item => {
                return <div key={item["primaryEntity"]}>
                        <span>{formErrors[item.primaryEntity]}</span>
                        {item["context"].includes(props.context) &&
                        <label htmlFor={item["table"]} key={item["table"]}>
                        {item["table"]}
                        la valeur: {form[item.primaryEntity]}
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

    for (const select of fields["select"]) {
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
                fetch('/api/animals', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json'
                    },
                    body: JSON.stringify(datasForRequest(form, 'creation'))
                })
                .then (response => {
                    if (response.status === 422) {
                        return  response.json()
                    } else {
                        console.log('des erreurs: ', response.status, response.statusText)
                        return response.json()
                    }
                })
                .then(resp => {
                    if (resp.violations) {
                        setFormErrors(validation(fields, resp))
                    } else {
                        setShowList(l => !l)
                    }
                })
            } catch(error) {
                console.log('il y a une erreur: ', error)
            }
        } else {
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

    console.log('la form: ', form)
    console.log('le field: ', fields)

    return (<div>
        {!showList && <form onSubmit={handleSubmit}>
        {fields["text"].map( item => {
            return <div key={item['primaryEntity']}>
                <span>{formErrors[item.primaryEntity]}</span>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <input type="text" name={item["primaryEntity"]} value={form[item.primaryEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        {!simpleResearch && fields["textarea"].map( item => {
            return <div key={item['primaryEntity']}>
                <span>{formErrors[item.primaryEntity]}</span>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <textarea name={item["primaryEntity"]} value={form[item.primaryEntity]} onChange={handleChange}/>
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
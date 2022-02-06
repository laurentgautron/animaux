import React, {useState, useEffect, useRef, useCallback} from "react";
import {inputFields} from './datas'
import {initFunction, makeUrl, datasForRequest} from './utils'
import AnimalCard from "./AnimalCard";
import HelloApp from "./HelloApp";

export function Form (props) {
    
    const {submitText, initForm} = initFunction(props)
    
    const controller = useRef( new AbortController())
    
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
    const [options, setOptions] = useState({})
    const text = submitText
    const [animalChange, setAnimalChange] = useState(false)
    const [animalCreation, setAnimalCreation] = useState(false)
    const [back, setBack] = useState(false)
    const [error, setError] = useState()
    
    console.log(' dans la form: ', back)


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
            fetch('api/' + select["table"], {signal: controller.current.signal})
            .then( response => response.json())
            .then( 
                result => {
                    setOptions( state => ({...state, [select["primaryEntity"]]: extractDatasSelect(result["hydra:member"])}))
                },
                error => setError(error)
                )
        }, [])
    }

    useEffect ( () => () => controller.current.abort(), [])

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
    

    const backToList = () => {
        setBack(b => !b)
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (props.context === "fullResearch") {
            //make an url and pass url in HelloApp
            props.onResult(makeUrl(form))
        } else if (props.context === 'creation') {
            fetch('/api/animals', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/ld+json'
                },
                body: JSON.stringify(datasForRequest(form))
            })
            .then( response => {if (response.ok) {
                setAnimalCreation(a => !a)
            }})
        } else {
            // const animalId = props.animalId.split('/')
            // const id = animalId[animalId.length - 1]
            fetch(props.animalId, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                },
                body: JSON.stringify(datasForRequest(form))
            })
            .then(response => response.json())
            .then(resp => setAnimalChange(a=> !a))
        }
    }

    return (<div>
        {!animalChange && !animalCreation && <form onSubmit={handleSubmit}>
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
    {animalCreation && <HelloApp />}
    </div>)
     
}
import React, {useState, useEffect} from "react";
import {tables, inputFields} from './datas'

export function Form (props) {

    // construct form
    const initForm = {}
    for (const item in inputFields) {
        for (const field of inputFields[item]) {
            initForm[field.finalEntity]  = ''
        }
    }
    
    const [form, setForm] = useState({...initForm})
    const [options, setOptions] = useState({})
    const [text, setText] = useState()
    const [error, setError] = useState()

    const extractDatas = (datas) => {
        let arrayDatas = []
        for ( const data of datas) {
            // nem key in data
            const name = data["@type"].toLowerCase() + "Name"
            // iri
            let optionNumber = data["@id"].split("/")
            const id = optionNumber[optionNumber.length-1]
            arrayDatas.push([id, data[name]])
        }
        return arrayDatas
    }

    const Select = () => {
        return ( <div>
            {inputFields["select"].map( item => {
                return <div key={item["finalEntity"]}>
                        {item["context"].includes(props.type) &&
                        <label htmlFor={item["table"]} key={item["table"]}>
                        {item["table"]}
                        <select name={item["finalEntity"]} id={item["finalEntity"]} key={item["finalEntity"]} value={form[item["finalEntity"]]} onChange={handleChange}>
                            <option value=""></option>
                            {options[item["table"]] && options[item["table"]].map( op => <option value={op[0]} key={op[0]}>{op[1]}</option>)}
                        </select>
                    </label>}
                </div>
            })}
        </div>
        )  
    }

    useEffect ( () => {
        for (const select of inputFields["select"]) {
            fetch('api/' + select["table"])
            .then( response => response.json())
            .then( 
                result => {
                    console.log('je change object options')
                    setOptions( state => ({...state, [select.primaryEntity]: extractDatas(result["hydra:member"])}))
                },
                error => setError(error)
                )
        }
    }, [])

    const handleChange = (ev) => {
        const { name, value }  = ev.target

        setForm( state => ({
            ...state, [name]: value
        }))
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        let url = "api/animals?"
        console.log('le form de state: ', form)
        for ( const key in form) {
            if (form[key] !== '') {
                console.log('la clé: ', key)
                console.log('lr form et key: ', form[key])
                url = url + key + "=" + form[key] + "&"
            }
        }
        console.log('url soumise de animalForm: ', url)
        // pass url to formResearch
        props.getResearchUrl(url)
    }

    return ( <form onSubmit={handleSubmit}>
        {inputFields["text"].map( item => {
            return <div key={item['finalEntity']}>
                {item["context"].includes(props.type) && <label htmlFor={item["finalEntity"]}>
                <input type="text" name={item["finalEntity"]} value={form[item.finalEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        <Select />
        <button type="submit">rechercher</button>
    </form>
    )
}
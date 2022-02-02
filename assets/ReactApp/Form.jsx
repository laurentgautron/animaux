import React, {useState, useEffect} from "react";
import {inputFields} from './datas'
import init from './utils'

export function Form (props) {
    
    const [form, setForm] = useState({...init(inputFields, "primaryEntity")})
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
                        <select name={item["primaryEntity"]} key={item["primaryEntity"]} value={form[item["primaryEntity"]]} onChange={handleChange}>
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
        for ( const key in form) {
            if (form[key] !== '') {
                if ( key !== 'diets') {
                    url = url + key + "=" + form[key] + "&"
                } else {
                    url = url + 'diet=' + form[key]
                }
            }
        }
        url = url.slice(0, -1)
        // pass url to formResearch
        props.getResearchUrl(url)
    }

    return ( <form onSubmit={handleSubmit}>
        {inputFields["text"].map( item => {
            return <div key={item['finalEntity']}>
                {item["context"].includes(props.type) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <input type="text" name={item["primaryEntity"]} value={form[item.primaryEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        {inputFields["textarea"].map( item => {
            return <div key={item['finalEntity']}>
                {item["context"].includes(props.type) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <textarea name={item["primaryEntity"]} value={form[item.primaryEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        <Select />
        <button type="submit">rechercher</button>
    </form>
    )
}
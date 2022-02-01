import React, {useState, useEffect} from "react";
import {initForm, tables} from './datas'

export function Form (props) {

    // const tables = ["diets", "species", "continents"]

    const [options, setOptions] = useState({})
    const [error, setError] = useState()
    const [form, setForm] = useState({...initForm})

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
            {tables.map( table => {
                return <label htmlFor={table} key={table}>
                    {table}
                    <select name={table} id={table} key={table} value={form[table]} onChange={handleChange}>
                        <option value=""></option>
                        {options[table] && options[table].map( op => <option value={op[0]} key={op[0]}>{op[1]}</option>)}
                    </select>
                </label>
            })}
        </div>
        )  
    }

    useEffect ( () => {
        for (const table of tables) {
            fetch('api/' + table)
            .then( response => response.json())
            .then( 
                result => {
                    console.log('je change object options')
                    setOptions( state => ({...state, [table]: extractDatas(result["hydra:member"])}))
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
        <label htmlFor="animalName">
            Nom:
            <input type="text" name="animalName" onChange={handleChange} value={form.animalName}/>
        </label>
        {props.type === "fullResearch" && <Select />}
        {props.type === "fullResearch" && <div>bonjour forme pleine</div>}
        {props.type === "simpleResearch" && <div>bonjour forme simple </div>}
        <button type="submit">rechercher</button>
    </form>
    )
}
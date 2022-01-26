import React, { useState, useEffect } from "react";
import HelloApp from './HelloApp'

export default function ResearchDetails () {

    const trad = {name: "nom", diets: "régime", continents: "continents", species: "espèce"}

    const [form, setForm] = useState({
        name: '',
        diets: '',
        species: '',
        continents: ''
    })

    const [url, setUrl] = useState()

    const [isSubmited, setIsSubmited] = useState(false)
    
    //get iri and option name for each field
    const extractDatas = (datas) => {
        let arrayDatas = []
        for ( const data of datas) {
            // nem key in data
            const name = data["@type"].toLowerCase() + "Name"
            // iri
            const id = data["@id"]
            arrayDatas.push([id, data[name]])
        }
        return arrayDatas
    }
    
    // get label and field for each table
    const Field = ({table, type}) => {
        let inputField = ""
        switch (type) {
            case "text":
                inputField = <input type="text" id="nom" placeholder="Ex: Lion" onChange={handleChange} value={form.name} name="name"/>
                break
            case "select":
                inputField = <Select table={table}/>
                break
        }

        return <div className="form-group">
            <label htmlFor="nom">{trad[table]}</label>
            {inputField}
        </div>
    }

    const Select = ({table}) => {
        const [error, setError] = useState(null)
        const [options, setOptions] = useState([])
        
        useEffect ( () => {
            fetch('api/' + table)
            .then( response => response.json())
            .then( 
                result => {
                    setOptions(extractDatas(result["hydra:member"]))
                },
                error => setError(error)
                )
        }, [])


        return (
            <select onChange={handleChange} value={form[table]} name={table}>
                <option value=""></option>
                {options.map( op => <option key={op[0]} value={op[1]}>{op[1]}</option> )} 
            </select>
        )
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        console.log("la liste dans reserach: ", form)
        let url = "api/animal"
        for ( const key in form) {
            url = url + "?" + key + "=" + form[key]
        }
        console.log('url fournie: ', url)
        setUrl(url)
        setIsSubmited(true)
    }

    const handleChange = (ev) => {
        const {value, name} = ev.target

        setForm( (state) => ({
            ...state, [name]: value
        }))
    }

    if (!isSubmited) {
        return (
            <form onSubmit={handleSubmit}>
                <Field type="text"/>
                <Field type="select" table="diets"/>
                <Field type="select" table="species"/>
                <Field type="select" table="continents"/>
                <button type="submit" className="btn btn-primary">rechercher</button>
            </form>
        )
    } else {
        return <HelloApp url={url}/>
    }


}
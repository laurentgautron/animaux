import React, { useState, useEffect } from "react";
import HelloApp from './HelloApp'

export default function ResearchDetails () {


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
                {options.map( op => <option key={op[0]} value={op[0]}>{op[1]}</option> )}
            </select>
        )
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        console.log("la liste dans reserach: ", form)
        let url = "api/animal"
        for ( const key in form) {
            if (form[key]) {
                url = url + "?" + key + "=" + form[key]
            }
        }
        setUrl(url)
        setIsSubmited(true)
    }

    console.log('url dans research: ', url)

    const handleChange = (ev) => {
        const {value, name} = ev.target

        setForm( (state) => ({
            ...state, [name]: value
        }))
    }

    if (!isSubmited) {
        return (
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="nom">nom</label>
                    <input type="text" id="nom" placeholder="Ex: Lion" onChange={handleChange} value={form.name} name="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="nom">régime</label>
                    <Select table="diets"/>
                </div>
                <div className="form-group">
                    <label htmlFor="nom">espèce</label>
                    <Select table="species"/>
                </div>
                <div className="form-group">
                    <label htmlFor="nom">continents</label>
                    <Select table="continents"/>
                </div>
                <button type="submit" className="btn btn-primary">rechercher</button>
            </form>
        )
    } else {
        return <HelloApp datas="des données"/>
    }
}
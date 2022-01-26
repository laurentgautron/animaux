import React, { useState, useEffect } from "react";
import HelloApp from './HelloApp'

export default function ResearchDetails () {

    const [form, setForm] = useState({
        name: '',
        diets: '',
        species: '',
        continents: ''
    })
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
    
    // const Field = ({table, type}) => {
    //     let inputField = ""
    //     switch (type) {
    //         case text:
    //             inputField = <input type="text" id="nom" placeholder="Ex: Lion" onChange={handleChange} value={form.name} name="name"/>
    //     }
    //     return <div className="form-group">
    //         <label htmlFor="nom">Nom</label>
    //         {inputField}
            
    //     </div>
    // }

    const Select = ({table}) => {
        const [error, setError] = useState(null)
        const [options, setOptions] = useState([])
        
        useEffect ( () => {
            fetch('api/' + table)
            .then( response => response.json())
            .then( 
                result => {
                    // if (table === "diets") {
                    //     table = table.slice(0, -1)
                    // }
                    console.log('les résultat: ', result["hydra:member"])
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
        console.log('je soumet', form)
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
                <div className="form-group">
                    <label htmlFor="nom">Nom</label>
                    <input type="text" id="nom" placeholder="Ex: Lion" onChange={handleChange} value={form.name} name="name"/>
                </div>
                <div className="form-group">
                    <label htmlFor="diets">Régime</label>
                    <Select table="diets"/>
                </div>
                <div className="form-group">
                    <label htmlFor="species">espèces</label>
                    <Select table="species"/>
                </div>
                <div className="form-group">
                    <label htmlFor="continents">continent</label>
                    <Select table="continents"/>
                </div>
                <button type="submit" className="btn btn-primary">rechercher</button>
            </form>
        )
    } else {
        return <HelloApp />
    }


}
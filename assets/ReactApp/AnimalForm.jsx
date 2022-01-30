import React, {useState, useEffect} from "react";
import { stateForm } from "./datas";

export default function AnimalForm(props) {

    const [form, setForm] = useState(stateForm)

    const Field = ({param}) => {

        let inputField = ""

        const Select = ({table}) => {
        
            const [error, setError] = useState(null)
            const [options, setOptions] = useState([])

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
                <select value={form[param.entityField]} onChange={onChange} name={param.entityField}>
                    <option value=""></option>
                    {options.map( op => <option key={op[0]} value={op[0]}>{op[1]}</option> )}
                </select>
            )
        }
    
        switch (param.type) {
            case 'text':
                console.log('la classe: ', param.entityField)
                inputField =  <input className={param.entityField} type="text" id={param.entityField} onChange={onChange} value={form[param.entityField]} name={param.entityField}/>;
                break;
            case 'select':
                inputField = <Select table={param.table}/>;
                break;
        }

        return (
            <div className="form-group">
                    <label htmlFor={param.entityField}>{param.labelName}
                    {inputField}
                    </label>
            </div>
        )
    }

    const onChange = (ev) => {

        const {name, value} = ev.target

        setForm( (state) => ({
            ...state, [name]: value
        }))
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        let url = "api/animals"
        for ( const key in form) {
            if (form[key] !== '' && form[key] !== "text") {
                url = url + "?" + key + "=" + form[key]
            // bug with onChange for input text
            } else if (form[key] === "text") {
                url = url + "?" + key + document.getElementsByClassName("animalName")[0].value
            }
        }
        console.log('url soumise de animalForm: ', url)
        props.getResearchUrl(url)
    }


    return (
        <form onSubmit={handleSubmit}>
            {/* <label htmlFor="animalName">
                nom
                <input type="text" value={form.animalName} onChange={onChange} name="animalName"/>
            </label> */}
            {props.fields.map( f => <Field param={f} key={f.entityField}/>)}
            <button type="submit" className="btn btn-primary">rechercher</button>
        </form>
    )
}
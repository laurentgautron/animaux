import React, {useState, useEffect} from "react";
import { stateForm } from "./datas";

export default function AnimalForm(props) {

    const [state, setState] = useState(stateForm)

    const Field = ({param}) => {

        console.log('le field: ', param)

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
            console.log('la table:', table)
            
            useEffect ( () => {
                fetch('api/' + table)
                .then( response => response.json())
                .then( 
                    result => {
                        console.log('le résultat defetch: ', result)
                        setOptions(extractDatas(result["hydra:member"]))
                    },
                    error => setError(error)
                    )
            }, [])
            console.log('les options: ', options)
    
            return (   
                <select value={state[param.entityField]} name={param.entityField}>
                    <option value=""></option>
                    {options.map( op => <option key={op[0]} value={op[0]}>{op[1]}</option> )}
                </select>
            )
        }

        switch (param.type) {
            case 'text':
                console.log('un texte')
                inputField =  <input type="text" id={param.entityField} value={state[param.entityField]} name={param.entityField}/>
                break
            case 'select':
                inputField = <Select table={param.table}/>
                break
        }

        return (
            <div className="form-group">
                    <label htmlFor={param.entityField}>{param.labelName}</label>
                    {inputField}
            </div>
        )
    }

    console.log('le animalFomr: ', props)
    return (
        <form>
            {props.fields.map( f => <Field param={f} key={f.entityField}/>)}
            <button type="submit">rechercher</button>
        </form>
    )
}
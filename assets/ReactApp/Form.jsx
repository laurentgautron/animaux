import React, {useState, useEffect, useRef} from "react";
import {initFunction, 
        makeUrl, 
        datasForRequest, 
        validation, 
        init, 
        contextFields,
        prepareIdApi} from '../services/utils'
import { tableApi } from "../services/datas";

export function Form (props) {


    const fields = contextFields(props.field)

    const submitText = (props.context === 'edition' || props.context === 'creation') ? "enregistrer" : "rechercher"
    
    const [form, setForm] = useState(initFunction(props))
    const [formErrors, setFormErrors] = useState(init(fields, 'primaryEntity'))
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
            {fields['select'] && fields["select"].map( item => {
                return <div key={item["primaryEntity"]}>
                        <span>{formErrors[item.primaryEntity]}</span>
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


    const controller = useRef(new AbortController())
    if (fields['select']) {
        useEffect ( async () => {
            let datas = {}
            for (const select of fields["select"]) {
                const response = await fetch('api/' + select["table"],
                {signal: controller.current.signal}
                ).then(rep => rep.json())
                datas[select["primaryEntity"]] =  extractDatasSelect(response["hydra:member"])
            }
            setOptions(datas)
        }, [])
    }

    useEffect ( () => () => controller.current.abort())

    const handleChange = (ev) => {
        if (ev.target.multiple) {
            const {name, selectedOptions} = ev.target
            setForm ( state => ({
                ...state, [name]: Array.from(selectedOptions, option => option.value)
            }))
        } else {
            const { name, value, type }  = ev.target
            const newValue = type === "number" ? parseInt(value, 10) : value
            setForm( state => ({
                ...state, [name]: newValue
            }))
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (props.context === "fullResearch" || props.context === 'simpleResearch') {
            //make an url and pass url in HelloApp
            props.onResult(makeUrl(form))
        } else if (props.context === 'creation') {
            try {
                const url = 'api/' + tableApi[props.field]
                fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/ld+json'
                    },
                    body: JSON.stringify(datasForRequest(form, 'creation', fields, props))
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
                        props.onAdd()
                    }
                })
            } catch(error) {
                console.log('il y a une erreur: ', error)
            }
        } else {
            console.log('pour le patch le field: ', props.field)
            console.log('pour le patch la table: ', tableApi[props.field])
            console.log('pour le patch le id: ', props.id)
            fetch(prepareIdApi(tableApi[props.field], props.id), {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                },
                body: JSON.stringify(datasForRequest(form, 'edition', fields, props))
            })
            .then(response => response.json())
            .then(resp => {
                if (resp.violations) {
                    console.log(resp.violations)
                } else {
                    // callBack to change id in HeolloApp
                    props.onEdit(props.id)
                }
            })
        }
    }

    return (<div>
        {/* faire un composant formTitle  en mettant un enfant ...*/}
        {props.field === 'animal' && props.context === 'edition' && !showList && 
        <h1>modifier l'animal: {form.animalName}</h1>}
        {props.field === 'worldPopulation' && props.context === 'edition' && !showList && 
        <h1>modifier la population de l'animal: {props.animalName}</h1>}
        <form onSubmit={handleSubmit}>
        {fields["number"] && fields["number"].map( item => {
            return <div key={item['primaryEntity']}>
                {formErrors[item.primaryEntity] === 0 ? <span></span>: <span>{formErrors[item.primaryEntity]}</span>}
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <input type="number" name={item["primaryEntity"]} value={form[item.primaryEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        {fields['text'] && fields["text"].map( item => {
            if ( item['context'].includes(props.context)) {
                return <div key={item['primaryEntity']}>
                    <span>{formErrors[item.primaryEntity]}</span>
                    <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                    <input type="text" name={item["primaryEntity"]} value={form[item.primaryEntity]} onChange={handleChange}/>
                    </label>
                </div>
            }
        })}
        {fields['textarea'] && fields["textarea"].map( item => {
            return <div key={item['primaryEntity']}>
                <span>{formErrors[item.primaryEntity]}</span>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <textarea name={item["primaryEntity"]} value={form[item.primaryEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        <Select />
        <button type="submit">{text}</button>
    </form>
    </div>)
     
}
import React, {useState, useEffect} from "react";
import {inputFields} from './datas'
import {initFunction} from './utils'

export function Form (props) {

    const {submitText, initForm} = initFunction(props)

    
    const [form, setForm] = useState({
        ...initForm,
        text: submitText
        })
    const [options, setOptions] = useState({})
    const [text, setText] = useState()
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

    const datasForPatch = (objectForm) => {
        console.log('objet à modifier pour le patch: ', objectForm)
        delete objectForm['visible']
        delete objectForm['wantModify']
        delete objectForm['text']
        delete objectForm["continents"]
        console.log('la form pour le patch: ', objectForm)
        return objectForm
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

    useEffect ( () => {
        for (const select of inputFields["select"]) {
            fetch('api/' + select["table"])
            .then( response => response.json())
            .then( 
                result => {
                    setOptions( state => ({...state, [select["primaryEntity"]]: extractDatasSelect(result["hydra:member"])}))
                },
                error => setError(error)
                )
        }
    }, [])

    const handleChange = (ev) => {
        if (ev.target.multiple) {
            console.log('je suis en multiple')
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

    const handleSubmit = (ev) => {
        ev.preventDefault()
        if (props.context === "fullResearch" || props.context === "simpleResearch") {
            let url = "api/animals?"
            for ( const key in form) {
                console.log('les form: ', form[key])
                if (form[key] !== '' && key !== "text") {
                    if ( key === 'diets') {
                        url = url + 'diet=' + form[key]
                    } else if (Array.isArray(form[key])) {
                        console.log('un array !!: ', form[key])
                        for (const item of form[key]) {
                            url = url + key + '[]='+ item + "&"
                        }
                    } else {
                        url = url + key + "=" + form[key] + "&"
                    }
                }
            }
            url = url.slice(0, -1)
            console.log('url genere: ', url)
            // pass url to formResearch
            props.getResearchUrl(url)
        } else {
            console.log('on modifie')
            console.log('id de animal: ', props.animalId)
            const animalId = props.animalId.split('/')
            const id = animalId[animalId.length - 1]
            fetch('api/animals/' + id, {
                method: "PATCH",
                headers: {
                    'Content-Type': 'application/merge-patch+json'
                },
                body: JSON.stringify(datasForPatch(form))
            })
            .then(response => response.json())
            .then(resp => console.log('la reponse: ', resp))
        }
    }

    console.log('la form de form: ', form)
    console.log('les options: ', options)

    return ( <form onSubmit={handleSubmit}>
        {inputFields["text"].map( item => {
            return <div key={item['finalEntity']}>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <input type="text" name={item["finalEntity"]} value={form[item.finalEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        {inputFields["textarea"].map( item => {
            return <div key={item['finalEntity']}>
                {item["context"].includes(props.context) && <label htmlFor={item["primaryEntity"]}>{item["primaryEntity"]}
                <textarea name={item["finalEntity"]} value={form[item.finalEntity]} onChange={handleChange}/>
            </label>}
        </div>
        })}
        <Select />
        <button type="submit">{form.text}</button>
    </form>
    )
}
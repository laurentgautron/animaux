import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Form } from "./Form";
import { init } from "../services/utils";
import { worldPopulations } from "../services/datas";
import Pagination from "./Pagination";
import Modale from "./Modale";
import AnimalServices from "../services/animals-services";
import * as fields from "../services/datas.js"

export function Population (props) {

    const makeNumber = (value) => {
        let urlTab = value.split('/')
        return urlTab[urlTab.length - 1]
    }

    const [addYear, setAddYear] = useState(false)
    const [populationList, setPopulationList] = useState([])
    const [edit, setEdit] = useState(false)
    const [datas, setDatas] = useState(init(worldPopulations))
    const [idPopulation, setIdPopulation] = useState()
    const [url, setUrl] = useState('api/world_populations/?animal=' + props.id)
    const [view, setView] = useState()
    const [visible, setVisible] = useState(false)
    const [wantDesctruction, setWantDesctruction] = useState(false)
    const [key, setKey] = useState()
    const [modaleKey, setModaleKey] = useState(1)
    
    useEffect( () => {
        fetch(url, {
            method: "GET",
            headers: {'Content-Type' : 'application/ld+json'}
        })
        .then(response => response.json())
        .then(resp => {
            setPopulationList(resp["hydra:member"])
            setView(resp["hydra:view"])
        } )
    // on url change and edit change: refresh
    // call onEdit in form to change edit in false and so refrresh population list
    }, [url, edit])

    const handlePage = (activePage) => {
        setUrl(activePage)
    }

    const onModify = async (pop, key) => {
        if (await AnimalServices.checkconnexion()) {
            fetch(pop["@id"], {
                metohd: "GET",
                headers: {
                    'Content-Type': 'application/ld+json'
                }
            })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
            })
            .then(resp => {
                for ( const key in resp) {
                    if (datas[key] !== undefined) {
                        setDatas(state => ({
                            ...state, [key]: resp[key]
                        }))
                    }
                }
                setEdit(true)
                setIdPopulation(makeNumber(pop["@id"]))
                setKey(key)
            })
        } else {
           setVisible(true)
           setModaleKey(m => m+1)
        }
    }

    
    const handleAddYear = () => {
        setAddYear(y => !y)
    }
    
    const handleEdit = () => {
        setEdit(false)
    }

    const handleDelete = async (p) => {
        if (await AnimalServices.checkconnexion()) {
            setVisible(true)
            setWantDesctruction(true)
            setIdPopulation(p["@id"])
            setModaleKey(m => m+1)
        } else {
            setVisible(true)
            setModaleKey(m => m+1)
        }
    }

    const del = () => {
        fetch(idPopulation, {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                console.log('disparu !')
                props.changeKey()
            }
        })
    }

    return (<div> 
        {!addYear && !edit &&
            <div className="populations">
                <h1 className="mt-4 mb-4">liste des populations pour l'animal: <span className="d-inline-block">{props.animalName}</span></h1>
                <button onClick={() => props.onDescription()} className="btn btn-primary me-2 mb-4">description</button>
                <button onClick={() => setAddYear(true)} className="btn btn-primary mb-4">ajouter une population</button>
                <div className="d-flex justify-content-center align-items-center">
                    <div className="w-50">
                        <table className="mb-4">
                            <caption>
                                population par années de l'animal {props.animalName}
                            </caption>
                            <thead className="mb-4">
                                <tr>
                                    <th>année</th>
                                    <th>population</th>
                                    <th colSpan="2">actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-info text-dark">
                            {populationList.map( (p,key) => <tr key={p["@id"]}>
                                    <td>{p.year}</td>
                                    <td>{p.population}</td>
                                    <td colSpan="2" className="text-right">
                                        <button onClick={() => handleDelete(p)}><FontAwesomeIcon icon={faTrashCan} /></button>
                                        <button onClick={() => onModify(p, key)}><FontAwesomeIcon icon={faPencil} /></button>
                                    </td>
                                </tr>)}
                            </tbody>
                        </table>
                    </div>
                    <div className="w-50 d-flex justify-content-center">graphique</div>
                </div>
                <Pagination view={view} onPage={handlePage}/>
            </div>}
            {edit && <Form 
                        context="edition" 
                        datas={datas} 
                        id={idPopulation} 
                        animalId={props.id} 
                        fields={fields.worldPopulations}
                        table="world_populations"
                        onEdit={handleEdit}>
                        modifier la population de l'année {populationList[key] !== undefined && 
                        <span>{populationList[key]["year"]}</span>} pour l'animal {props.animalName}
                        </Form>}
            {addYear && <Form 
                        context="creation"
                        // props.id is animalId
                        animalId={props.id} 
                        fields={fields.worldPopulations}
                        table="world_populations"
                        onAdd={handleAddYear}>
                        ajouter une population pour l'animal {props.animalName}
                        </Form>}
            {wantDesctruction ? <Modale visible={visible} 
                                         // i need animalId if not connected to come back on animal's card
                                         animalId={props.id}
                                         context="destruction"
                                         del={del}
                                         changeId={handleEdit}
                                         key={modaleKey}
                                />:
                                <Modale  visible={visible}
                                           context="change"
                                           animalId={props.id}
                                           key={modaleKey}/>}
        </div>)
}
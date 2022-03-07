import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Form } from "./Form";
import { init } from "../services/utils";
import { world_populations } from "../services/datas";
import Pagination from "./Pagination";
import Modale from "./Modale";

export function Population (props) {

    const makeNumber = (value) => {
        let urlTab = value.split('/')
        return urlTab[urlTab.length - 1]
    }

    const [addYear, setAddYear] = useState(false)
    const [populationList, setPopulationList] = useState([])
    const [edit, setEdit] = useState(false)
    const [datas, setDatas] = useState(init(world_populations))
    const [idPopulation, setIdPopulation] = useState()
    const [url, setUrl] = useState('api/world_populations/?animal=' + props.id)
    const [view, setView] = useState()
    const [visible, setVisible] = useState(false)
    const [wantDesctruction, setWantDesctruction] = useState(false)
    const [key, setKey] = useState()
    const [modaleKey, setModaleKey] = useState(1)
    
    useEffect( () => {
        console.log('useEffect dans population')
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

    const checkconnexion = async () => {
        let response = await fetch('/checkUserConnexion')
        if (response.ok) {
            return response.json()
        } else {
            return response.status
        }
    }

    const onModify = async (pop, key) => {
        console.log('le p: ', key)
        if (await checkconnexion()) {
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
                console.log('je change la clé: ', key)
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
        if (await checkconnexion()) {
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
            <div>
                <h1>liste des populations pour l'animal: {props.animalName}</h1>
                <button onClick={() => props.onDescription()}>description</button>
                <button onClick={() => setAddYear(true)}>ajouter une population</button>
                <table>
                    <thead>
                        <tr>
                            <th>année</th>
                            <th>population</th>
                            <th>suppression</th>
                            <th>modification</th>
                        </tr>
                    </thead>
                    <tbody>
                    {populationList.map( (p,key) => <tr key={p["@id"]}>
                            <td>{p.year}</td>
                            <td>{p.population}</td>
                            <td><button onClick={() => handleDelete(p)}><FontAwesomeIcon icon={faTrashCan} /></button></td>
                            <td><button onClick={() => onModify(p, key)}><FontAwesomeIcon icon={faPencil} /></button></td>
                        </tr>)}
                    </tbody>
                </table>
                <Pagination view={view} onPage={handlePage} />
            </div>}
            {edit && <Form 
                        context="edition" 
                        datas={datas} 
                        id={idPopulation} 
                        animalId={props.id} 
                        field="world_populations" 
                        onEdit={handleEdit}>
                        modifier la population de l'année {populationList[key] !== undefined && 
                        <span>{populationList[key]["year"]}</span>} pour l'animal {props.animalName}
                        </Form>}
            {addYear && <Form 
                        context="creation"
                        id={props.id} 
                        field="world_populations"
                        onAdd={handleAddYear}>
                        ajouter une population pour l'animal {props.animalName}
                        </Form>}
            {wantDesctruction && <Modale visible={visible} 
                                         animalId={props.id}
                                         context="destruction"
                                         del={del}
                                         changeId={handleEdit}
                                         key={modaleKey}/>}
            {!wantDesctruction && <Modale  visible={visible}
                                           context="change"
                                           animalId={props.id}
                                           key={modaleKey}/>}
        </div>)
}
import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Form } from "./Form";
import { init } from "./utils";
import { worldPopulation } from "./datas";
import Pagination from "./Pagination";

export function Population (props) {

    const makeNumber = (value) => {
        let urlTab = value.split('/')
        return urlTab[urlTab.length - 1]
    }

    const [addYear, setAddYear] = useState(false)
    const [populationList, setPopulationList] = useState([])
    const [edit, setEdit] = useState(false)
    const [datas, setDatas] = useState(init(worldPopulation))
    const [idPopulation, setIdPopulation] = useState()
    const [url, setUrl] = useState('api/world_populations/?animal=' + props.id)
    const [view, setView] = useState()
    
    useEffect( () => {
        fetch(url, {
            method: "GET",
            headers: {'Content-Type' : 'application/ld+json'}
        })
        .then(response => response.json())
        .then(resp => {
            console.log('la réponse: ', resp)
            setPopulationList(resp["hydra:member"])
            setView(resp["hydra:view"])
        } )
    }, [url, edit])

    const handlePage = (activePage) => {
        setUrl(activePage)
    }

    const onModify = (pop) => {
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
        })
    }

    const handleEdit = () => {
        setEdit(e => !e)
    }

    const handleAddYear = () => {
        setAddYear(y => !y)
    }

    const handleDelete = (p) => {
        console.log( 'le post a détruire:', p)
        fetch(p["@id"], {
            method: "DELETE"
        }).then(response => {
            if (response.ok) {
                console.log('disparu !')
                // props.onDelete(props.id)
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
                    {populationList.map( p => <tr key={p["@id"]}>
                            <td>{p.year}</td>
                            <td>{p.population}</td>
                            <td><button onClick={() => handleDelete(p)}><FontAwesomeIcon icon={faTrashCan} /></button></td>
                            <td><button onClick={() => onModify(p)}><FontAwesomeIcon icon={faPencil} /></button></td>
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
                        onEdit={handleEdit}/>}
            {addYear && <Form 
                        context="creation"
                         id={props.id} 
                         field="worldPopulation"
                         onAdd={handleAddYear}/>}
        </div>)
}
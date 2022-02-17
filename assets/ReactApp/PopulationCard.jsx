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

    const [animalCard, setAnimalCard] = useState(false)
    const [addYear, setAddYear] = useState(false)
    const [populationList, setPopulationList] = useState([])
    const [edit, setEdit] = useState(false)
    const [datas, setDatas] = useState(init(worldPopulation))
    const [idPopulation, setIdPopulation] = useState()
    const [url, setUrl] = useState('api/world_populations/?animal=' + makeNumber(props.id))
    const [view, setView] = useState()
    const [key, setKey] = useState(1)

    useEffect( () => {
        console.log(' la page url: ', url)
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
    }, [url])

    const handlePage = (activePage) => {
        console.log('activePage: ', activePage)
        setUrl(activePage)
    }

    const onModify = (pop) => {
        console.log('je fetch avec id: ', pop["@id"])
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
            console.log('la response de edit: ', resp)
            for ( const key in resp) {
                if (datas[key] !== undefined) {
                    setDatas(state => ({
                        ...state, [key]: resp[key]
                    }))
                }
            }
            setEdit(true)
            setIdPopulation(pop["@id"])
        })
    }

    const handleEdit = () => {
        setEdit(e => !e)
    }

    console.log('le props edit: ', props)

    return (<div> 
        {!animalCard && !addYear && !edit &&
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
                            <td><button><FontAwesomeIcon icon={faTrashCan} /></button></td>
                            <td><button onClick={() => onModify(p)}><FontAwesomeIcon icon={faPencil} /></button></td>
                        </tr>)}
                    </tbody>
                </table>
                <Pagination view={view} onPage={handlePage} key={key} />
            </div>}
            {edit && <Form 
                        context="edition" 
                        datas={datas} id={idPopulation} 
                        animalId={props.id} 
                        field="worldPopulation" 
                        onEdit={handleEdit}/>}
            {addYear && <Form context="creation" id={props.id} field="worldPopulation"/>}
        </div>)
}
//     const [animalCard, setAnimalCard] = useState(false)
//     const [addYear, setAddYear] = useState(false)
//     const [modifyPopulation, setModifyPopulation] = useState(false)
//     const [datas, setDatas] = useState()
//     const [idPopulation, setIdPopulation] = useState()
//     const [destructionSuccess, setDestructionSuccess] = useState(false)

//     const handleDescription = () => {
//         setAnimalCard(a => !a)
//     }

//     const handleAdd = () => {
//         setAddYear(y => !y)
//     }

//     const handleEdit = (op) => {
//         console.log('je vais editer')
//         setModifyPopulation(e => !e)
//         setDatas({
//             population: op['population'],
//         })
//         setIdPopulation(op['#id'])
//     }

//     const handleDel = (op) => {
//         fetch(op['@id'], {
//             method: "DELETE"
//         }).then(response => {if (response.ok) {
//             setDestructionSuccess(d => !d)
//         }})
//     }


//     return (<div>{!animalCard && !addYear && !modifyPopulation && !destructionSuccess &&
//         <div>
//             <h1>{props.animalName}</h1>
//             <button className="btn btn-primary" onClick={handleDescription}>desciption</button>
//             <button className="btn btn-primary" onClick={handleAdd}>ajouter un champ</button>
//             <div>{props.population.map( op => { 
//                 return <div key={op['@id']}>
//                     <h3>année: {op['year']}</h3>
//                     <p>population: {op['population']}</p>
//                     <button className="btn btn-primary" onClick={() => handleDel(op)}>supprimer</button>
//                     <button className="btn btn-primary" onClick={() => handleEdit(op)}>modifier</button>
//                 </div>})}
//             </div>
//         </div>}
//         {addYear && <Form field="worldPopulation" context="creation" id={props.id}/>}
//         {modifyPopulation && <Form field="worldPopulation" 
//                                    context="edition" 
//                                    id={props.population[0]['@id']} 
//                                    datas={datas} 
//                                    animalName={props.animalName}
//                                    animalId={props.id}/>}
//         {destructionSuccess && <HelloApp />}
//     </div>
//     )
// }
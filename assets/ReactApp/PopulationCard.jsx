import React, {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil, faTrashCan } from "@fortawesome/free-solid-svg-icons";
// import {init} from './utils'


export function Population (props) {

    const [animalCard, setAnimalCard] = useState(false)
    const [addYear, setAddYear] = useState(false)
    const [populationList, setPopulationList] = useState([])

    useEffect( () => {
        fetch('api/world_populations/?animal=' + props.id, {
            method: "GET",
            headers: {'Content-Type' : 'application/ld+json'}
        })
        .then(response => response.json())
        .then(resp => {
            console.log('la réponse: ', resp["hydra:member"])
            setPopulationList(resp["hydra:member"])
        } )
    }, [])

    console.log('animalcard: ', animalCard)
    console.log('addYear: ', addYear)
    return (<div> 
        {!animalCard && !addYear &&
            <div>
                <h1>liste des populations pour l'animal: {props.animalName}</h1>
                <button onClick={() => setAnimalCard(true)}>descrition</button>
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
                            <td><FontAwesomeIcon icon={faTrashCan} /></td>
                            <td><FontAwesomeIcon icon={faPencil} /></td>
                        </tr>)}
                    </tbody>
                </table>
            </div>}
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
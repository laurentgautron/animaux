import React, {useEffect, useState} from "react";
import {init} from './utils'


export function Population (props) {

    const [form, setForm] = useState(init('worldPopulation'))

    console.log('id de animal: ', typeof(props.id))

    const findlist = async () => {
        const response = await fetch('api/world_populations/?animal=' + props.id, {
            method: "GET",
            headers: {'Content-Type' : 'application/ld+json'}
        })
        const repJson = await response.json()
        const liste = repJson['hydra:member']
        return  liste
    }

    useEffect( () => {
        console.log('la liste: ', findlist())
        // fetch('api/world_populations/?animal=' + props.id, {
        //     method: "GET",
        //     headers: {'Content-Type' : 'application/ld+json'}
        // })
        // .then(response => response.json())
        // .then(rep => console.log('réponse de population: ', rep))
    }, [])

    return <h1>Bonjour population</h1>
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
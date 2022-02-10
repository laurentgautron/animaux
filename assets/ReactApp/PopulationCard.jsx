import React, {useState} from "react";
import HelloApp from "./HelloApp";
import { Form } from "./Form";


export function Population (props) {

    const [animalCard, setAnimalCard] = useState(false)
    const [addYear, setAddYear] = useState(false)
    const [modifyPopulation, setModifyPopulation] = useState(false)
    const [datas, setDatas] = useState()
    const [idPopulation, setIdPopulation] = useState()
    const [destructionSuccess, setDestructionSuccess] = useState(false)

    const handleDescription = () => {
        setAnimalCard(a => !a)
    }

    const handleAdd = () => {
        setAddYear(y => !y)
    }

    const handleEdit = (op) => {
        console.log('je vais editer')
        setModifyPopulation(e => !e)
        setDatas({
            population: op['population'],
        })
        setIdPopulation(op['#id'])
    }

    const handleDel = (op) => {
        console.log('je détruit: ', op['@id'])
        fetch(op['@id'], {
            method: "DELETE"
        }).then(response => {if (response.ok) {
            setDestructionSuccess(d => !d)
        }})
    }

    console.log('les datas: ', datas)
    console.log('les populations: ', props)
    console.log('le id envoyé dands la card: ', props.id)
    console.log('le id population envoyé: ', idPopulation)

    return (<div>{!animalCard && !addYear && !modifyPopulation && !destructionSuccess &&
        <div>
            <h1>{props.animalName}</h1>
            <button className="btn btn-primary" onClick={handleDescription}>desciption</button>
            <button className="btn btn-primary" onClick={handleAdd}>ajouter un champ</button>
            <div>{props.population.map( op => { 
                return <div key={op['@id']}>
                    <h3>année: {op['year']}</h3>
                    <p>population: {op['population']}</p>
                    <button className="btn btn-primary" onClick={() => handleDel(op)}>supprimer</button>
                    <button className="btn btn-primary" onClick={() => handleEdit(op)}>modifier</button>
                </div>})}
            </div>
        </div>}
        {addYear && <Form field="worldPopulation" context="creation" id={props.id}/>}
        {modifyPopulation && <Form field="worldPopulation" 
                                   context="edition" 
                                   id={props.population[0]['@id']} 
                                   datas={datas} 
                                   animalName={props.animalName}
                                   animalId={props.id}/>}
        {destructionSuccess && <HelloApp />}
    </div>
    )
}
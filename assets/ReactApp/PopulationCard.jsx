import React, {useState} from "react";


export function Population (props) {

    const [formPopulation, setFormPopulation] = useState({})

    console.log('la population: ', props.population)

    return (props.population.map( op => { return <div>
        <h3>année: {op['year']}</h3>
        <p>population: {op['population']}</p>
    </div>}))
}
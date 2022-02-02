import React from "react";
import {editForm} from './datas'

class AnimalCard extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {...editForm}
    }

    componentDidMount() {
        fetch(this.props.animalId, {
            method: "GET",
        })
        .then( response => {if (response.ok) { return response.json() }} )
        .then( resp => {
            // pour tous les champs qui ne commencent pas par @
            // prendre la clé et le resultat de clé et faire une bouble sur le setState
            console.log('animal: ', resp)
            for (const key in resp) {
                if (key[0] !== "@") {
                    if (Array.isArray(resp[key])) {
                        console.log('on a un tableau: ', key)
                        let tab = []
                        for (const item of resp[key]) {
                            console.log('le item du rep tableau: ', item)
                            tab.push(item[item["@type"].toLowerCase() + "Name"])
                        }
                        this.setState(state => ({
                            ...state,  [key]: tab
                        }))
                    } else if (resp[key][key + "Name"]) {
                        this.setState(state => ({
                            ...state,  [key]: resp[key][key + "Name"]
                        }))
                    } else {
                        this.setState(state => ({
                            ...state,  [key]: resp[key]
                        }))
                    }
                }
            }
        }
        )
    }

    render() {
        console.log('le state: ', this.state)
        return<div>
            <h1>{this.state.animalName}</h1>
            <p>{this.state.description}</p>
            <div>espèce: {this.state.species}</div>
            <div>régime: {this.state.diet}</div>
            {this.state.continents && <div>continents: {this.state["continents"].map( c => <span>{c}</span>)}</div>}
            <a href="/login">connexion</a>
        </div> 
    }
}

export default AnimalCard
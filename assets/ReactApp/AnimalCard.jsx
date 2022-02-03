import React from "react";
import {inputFields} from './datas'
import init from './utils'

class AnimalCard extends React.Component
{ 
    constructor(props) {
        super(props)
        this.state = {... init(inputFields, "finalEntity")}
    }

    findCorrespondance = (keyList) => {
        console.log('objet recupere: ', keyList)
        for (const key in this.state) {
            console.log('la clé de state: ', key)
            for (const keyResp in keyList) {
                console.log('la clé de keyList: ', keyResp)
                console.log('correspondance: ', key === keyResp)
                if (key === keyResp) {
                    return key
                }
            }
        }
    }

    componentDidMount() {
        fetch(this.props.animalId, {
            method: "GET",
        })
        .then( response => {if (response.ok) { return response.json() }} )
        .then( resp => {
            // pour tous les champs qui ne commencent pas par @
            // prendre la clé et le resultat de clé et faire une boucle sur le setState
            // on aura trois cas;: un string , un tableau, un objet
            for (const key in resp) {
                let keyForSave = ''
                if (key[0] !== "@") {
                    if (Array.isArray(resp[key])) {
                        let tab = []
                        for (const item of resp[key]) {
                            keyForSave = this.findCorrespondance(item)
                            tab.push(item[keyForSave])
                        }
                        this.setState(state => ({
                            ...state,  [keyForSave]: tab
                        }))
                    } else if (typeof(resp[key]) === "string") {
                        this.setState(state => ({
                            ...state,  [key]: resp[key]
                        }))
                    // else it's an object
                    } else {
                        keyForSave = this.findCorrespondance(resp[key])
                        this.setState(state => ({
                            ...state,  [keyForSave]: resp[key][keyForSave]
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
            <div>espèce: {this.state.speciesName}</div>
            <div>régime: {this.state.dietName}</div>
            {this.state.continentName && <div>continents: {this.state["continentName"].map( c => <span>{c}</span>)}</div>}
            <a href="/login">connexion</a>
        </div> 
    }
}

export default AnimalCard
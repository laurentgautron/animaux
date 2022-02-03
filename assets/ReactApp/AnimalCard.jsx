import React from "react";
import {inputFields} from './datas'
import {init} from './utils'
import Modale from './Modale'
import { Form } from "./Form";

class AnimalCard extends React.Component
{ 
    constructor(props) {
        super(props)
        this.state = {
            ...init(inputFields, "primaryEntity"), 
            visible: false,
            wantModify: false
        }
        this.finalKey = ["animalName", 'description', 'dietName', 'speciesName', 'continentName']
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
                if (key[0] !== "@") {
                    if (Array.isArray(resp[key])) {
                        let tab = []
                        for (const item of resp[key]) {
                            for (const itemKey in item) {
                                if (this.finalKey.includes(itemKey)) {
                                    tab.push([item[itemKey], resp[key]["@id"]])
                                }
                            }
                        }
                        this.setState(state => ({
                            ...state,  [key]: tab
                        }))
                    } else if (typeof(resp[key]) === "string") {
                        this.setState(state => ({
                            ...state,  [key]: resp[key]
                        }))
                    // else it's an object
                    } else {
                       for (const objectKey in resp[key]) {
                           const id =  resp[key]["@id"]
                           if (this.finalKey.includes(objectKey)) { 
                                this.setState(state => ({
                                    ...state,  [key]: [resp[key][objectKey], id]
                                }))
                           }
                       }
                    }
                }
            }
        }
        )
    }

    show = () => {
        this.setState({
            visible: true
        })
    }

    hide = () => {
        this.setState({
            visible: false
        })
    }

    onClick = () => {
        fetch('/checkUserConnexion')
        .then( response => response.json())
        .then( resp =>{
            if (resp) {
                console.log('tu peux')
                this.setState({
                    wantModify: true,
                })
            } else {
                console.log('tu peux pas')
                this.show()
            }
        })
    }


    render() {
        console.log('id animal dans cardlist: ', this.props.animalId)
        return <div>
            {!this.state.wantModify && <div>
                <h1>{this.state.animalName}</h1>
                <p>{this.state.description}</p>
                <div>espèce: {this.state.species[0]}</div>
                <div>régime: {this.state.diet[0]}</div>
                {this.state.continents && <div>continents: {this.state["continents"].map( c => <span key={c[0]}>{c[1]}</span>)}</div>}
                <button type="button" className="btn btn-primary"onClick={this.onClick}>modifier</button>
                <Modale visible={this.state.visible} hide={this.hide} />
            </div>}
            {this.state.wantModify && <Form context="edition" datas={this.state} animalId={this.props.animalId}/>}
        </div> 
    }
}

export default AnimalCard
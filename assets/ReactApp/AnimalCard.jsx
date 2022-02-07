import React from "react";
import {inputFields} from './datas'
import {init} from './utils'
import Modale from './Modale'
import { Form } from "./Form";
import HelloApp from "./HelloApp";

class AnimalCard extends React.Component
{ 
    constructor(props) {
        super(props)
        this.state = {
            ...init(inputFields, "primaryEntity"), 
            visible: false,
            wantModify: false,
            wantDestruction: false, 
            destructionSuccess: false
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
                                    tab.push([item[itemKey], item["@id"]])
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
            visible: true,
        })
    }

    hide = () => {
        this.setState({
            visible: false
        })
    }

    onClick = (ev) => {
        fetch('/checkUserConnexion')
        .then( response => response.json())
        .then( resp =>{
            if (resp) {
                if (ev.target.textContent === 'modifier') {
                    this.setState({
                        wantModify: true,
                    })
                }  else {
                    console.log('on detruit')
                    this.setState({
                        visible: true,
                        wantDestruction: true
                    })
                }
            } else {
                this.show()
            }
        })
    }

    del = () => {
        fetch(this.props.animalId, {
            method: "DELETE"
        }).then( response => {
            if (response.ok) {
                this.setState({
                    destructionSuccess: true
                })
            }
        })
    }


    render() {
        return <div>
            {!this.state.wantModify && !this.state.destructionSuccess && <div>
                <h1>{this.state.animalName}</h1>
                <p>Description:{this.state.description}</p>
                <div>espèce: {this.state.species[0]}</div>
                <div>régime: {this.state.diet[0]}</div>
                {this.state.continents && <div>continents: {this.state["continents"].map( c => <span key={c[1]}>{c[0]}</span>)}</div>}
                <button type="button" className="btn btn-primary" onClick={this.onClick}>modifier</button>
                <button type="button" className="'btn btn-primary" onClick={(this.onClick)}>supprimer</button>
                {!this.state.wantDestruction && <Modale visible={this.state.visible} hide={this.hide} animalId={this.props.animalId} context="change"/>}
                {this.state.wantDestruction && <Modale 
                                                visible={this.state.visible} 
                                                hide={this.hide} 
                                                animalId={this.props.animalId}
                                                context="destruction"
                                                del={this.del}/>
                                               }
            </div>}
            {this.state.wantModify && <Form context="edition" datas={this.state} animalId={this.props.animalId}/>}
            {this.state.destructionSuccess && <HelloApp />}
        </div> 
    }
}

export default AnimalCard
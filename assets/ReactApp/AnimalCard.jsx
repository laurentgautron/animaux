import React from "react";
import {animal, tableList} from './datas'
import {init} from './utils'
import Modale from './Modale'
import { Form } from "./Form";
import HelloApp from "./HelloApp";
import { Population } from "./PopulationCard";

class AnimalCard extends React.Component
{ 
    constructor(props) {
        super(props)
        this.state = {
            ...init(animal), 
            visible: false,
            wantModify: false,
            wantDestruction: false, 
            destructionSuccess: false,
            showPopulation: false
        }
    }

    componentDidMount() {
        fetch(this.props.animalId, {
            method: "GET",
        })
        .then( response => {if (response.ok) { return response.json() }} )
        .then( resp => {
            // all fields don't begin with '@' are values that i need
            // three case: a value (string), an array, or an object
            for (const key in resp) {
                if (key[0] !== "@") {
                    // treat array if key is ain tableList: datas for an other component
                    if (Array.isArray(resp[key]) && tableList.includes(key)) {
                        this.setState(state => ({
                            ...state, [key]: resp[key]
                        }))
                    // treat array
                    } else if (Array.isArray(resp[key])) {
                        let tab = []
                        for (const item of resp[key]) {
                            if (item['@id'] in tableList) {
                                // nerien faire
                            } else {
                                for (const itemKey in item) {
                                    if (itemKey[0]!== '@') {
                                        tab.push([item[itemKey], item["@id"]])
                                    }
                                }
                            }
                        }
                        this.setState(state => ({
                            ...state,  [key]: tab
                        }))
                    // treat a value
                    } else if (typeof(resp[key]) === "string") {
                        this.setState(state => ({
                            ...state,  [key]: resp[key]
                        }))
                    // else it's an object
                    } else {
                       for (const objectKey in resp[key]) {
                           const id =  resp[key]["@id"]
                           if (objectKey[0] !== '@') { 
                                this.setState(state => ({
                                    ...state,  [key]: [resp[key][objectKey], id]
                                }))
                           }
                       }
                    }
                }
            }
        })
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
            {!this.state.wantModify && !this.state.destructionSuccess && !this.state.showPopulation && <div>
                <h1>{this.state.animalName}</h1>
                <button type="button" className="btn btn-primary" onClick={this.onClick}>modifier</button>
                <button type="button" className="'btn btn-primary" onClick={this.onClick}>supprimer</button>
                <button type="button" className="'btn btn-primary" onClick={ () => this.setState({showPopulation: true})}>populations</button>
                <p>Description:{this.state.description}</p>
                <div>espèce: {this.state.species[0]}</div>
                <div>régime: {this.state.diet[0]}</div>
                {this.state.continents && <div>continents: {this.state["continents"].map( c => <span key={c[1]}>{c[0]}</span>)}</div>}
                {!this.state.wantDestruction && <Modale visible={this.state.visible} hide={this.hide} animalId={this.props.animalId} context="change"/>}
                {this.state.wantDestruction && <Modale 
                                                visible={this.state.visible} 
                                                hide={this.hide} 
                                                animalId={this.props.animalId}
                                                context="destruction"
                                                del={this.del}/>
                                               }
            </div>}
            {this.state.wantModify && <Form context="edition" datas={this.state} id={this.props.animalId} field="animal"/>}
            {this.state.showPopulation && <Population id={this.props.animalId}/>}
            {this.state.destructionSuccess && <HelloApp />}
        </div> 
    }
}

export default AnimalCard
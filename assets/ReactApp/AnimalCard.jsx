import React from "react";
import {animal, tableList} from './datas'
import {init, prepareIdApi} from './utils'
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
            showPopulation: false,
            key: 1
        }
    }

    getAnimal = () => {
        let form = {}
        fetch('api/animals/' + this.props.animalId, {
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
                        form[key] = resp[key]
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
                        form[key] = tab
                    // treat a value
                    } else if (typeof(resp[key]) === "string") {
                        form[key] = resp[key]
                    // else it's an object
                    } 
                    else {
                       for (const objectKey in resp[key]) {
                           const id =  resp[key]["@id"]
                           if (objectKey[0] !== '@') { 
                               form[key] = [resp[key][objectKey], id]
                           }
                       }
                    }
                }
            }
            return form
        }).then( form => {
            for (const key in form) {
                this.setState({
                    [key]: form[key]
                })
            }
        })
    }

    componentDidMount() {
        console.log('je monte')
        this.getAnimal()
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
                    console.log('on modifie')
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
                this.setState({
                    visible: true
                })
            }
        })
    }

    del = () => {
        fetch(prepareIdApi('animals', this.props.animalId), {
            method: "DELETE"
        }).then( response => {
            if (response.ok) {
                console.log('détruit')
            }
        })
    }

    changeId = (id) => {
        console.log('je change le id dans animalCard')
        this.props.changeId(id)
    }

    changeKey = () => {
        this.setState(state =>({
            key: state.key + 1
        }))
    }

    render() {
        return <div>
            {!this.state.wantModify && !this.state.destructionSuccess && !this.state.showPopulation && <div>
                <button type="button" className="btn btn-primary" onClick={this.onClick}>modifier</button>
                <button type="button" className="'btn btn-primary" onClick={this.onClick}>supprimer</button>
                <button type="button" className="'btn btn-primary" onClick={ () => this.setState({showPopulation: true})}>populations</button>
                <h1>{this.state.animalName}</h1>
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
                                                del={this.del}
                                                changeId={this.props.changeId}/>
                                               }
            </div>}
            {this.state.wantModify && <Form 
                                        context="edition" 
                                        datas={this.state} 
                                        id={this.props.animalId} 
                                        field="animal" 
                                        changeId={this.changeId}
                                        onEdit={this.changeId}/>}
            {this.state.showPopulation && <Population
                                            key={this.state.key}
                                            id={this.props.animalId} 
                                            animalName={this.state.animalName}
                                            onDescription={() => this.setState({showPopulation: false})}
                                            changeKey={this.changeKey}
                                            />}
        </div> 
    }
}

export default AnimalCard
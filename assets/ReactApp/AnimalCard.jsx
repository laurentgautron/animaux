import React from "react";
import {animals} from '../services/datas'
import {init, prepareIdApi} from '../services/utils'
import Modale from './Modale'
import { Form } from "./Form";
import { Population } from "./PopulationCard";
import AnimalServices from "../services/animals-services";

class AnimalCard extends React.Component
{ 
    constructor(props) {
        super(props)
        this.state = {
            ...init(animals), 
            visible: false,
            wantModify: false,
            wantDestruction: false, 
            showPopulation: false,
            populationKey: 1,
            modaleKey: 1
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
                    // treat array
                    if (Array.isArray(resp[key])) {
                        let tab = []
                        for (const item of resp[key]) {
                            for (const itemKey in item) {
                                if (itemKey[0]!== '@') {
                                    tab.push([item[itemKey], item["@id"]])
                                }
                            }
                        }
                        form[key] = tab
                    // treat a value
                    } else if (typeof(resp[key]) === "string") {
                        form[key] = resp[key]
                    // else it's an object
                    } else {
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
        this.getAnimal()
    }

    onClick = async (ev) => {
        if (await AnimalServices.checkconnexion()) {
            if (ev.target.textContent === 'modifier') {
                this.setState(state => ({
                    wantModify: true,
                    modaleKey: state.modaleKey
                }))
            }  else {
                this.setState(state => ({
                    visible: true,
                    wantDestruction: true,
                    modaleKey: state.modaleKey + 1
                }))
            }
        } else {
            console.log('je rends visible')
            this.setState(state => ({
                visible: true,
                modaleKey: state.modaleKey + 1
            }))
        }
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
        this.props.changeId(id)
    }

    changeKey = () => {
        this.setState(state =>({
            populationKey: state.populationKey + 1
        }))
    }

    render() {
        return <div>
            {!this.state.wantModify && !this.state.destructionSuccess && !this.state.showPopulation && <div>
                <button type="button" className="btn btn-primary" onClick={this.onClick}>modifier</button>
                <button type="button" className="btn btn-primary" onClick={this.onClick}>supprimer</button>
                <button type="button" className="btn btn-primary" onClick={ () => this.setState({showPopulation: true})}>populations</button>
                <h1>{this.state.animalName}</h1>
                <p>Description:{this.state.description}</p>
                <div>espèce: {this.state.species[0]}</div>
                <div>régime: {this.state.diet[0]}</div>
                {this.state.continents && <div>continents: {this.state["continents"].map( c => <span key={c[1]}>{c[0]}</span>)}</div>}
                {!this.state.wantDestruction ? <Modale 
                                                visible={this.state.visible} 
                                                animalId={this.props.animalId} 
                                                context="change"
                                                key={this.state.modaleKey}/>
                                             : <Modale 
                                                visible={this.state.visible} 
                                                animalId={this.props.animalId}
                                                context="destruction"
                                                del={this.del}
                                                changeId={this.props.changeId}
                                                key={this.state.modaleKey}/>
                }
            </div>}
            {this.state.wantModify && <Form 
                                        context="edition" 
                                        datas={this.state} 
                                        id={this.props.animalId} 
                                        field="animals"
                                        onEdit={this.changeId}>
                                        modifier l'animal: {this.state.animalName}
                                    </Form>}
            {this.state.showPopulation && <Population
                                            key={this.state.populationKey}
                                            id={this.props.animalId} 
                                            animalName={this.state.animalName}
                                            onDescription={() => this.setState({showPopulation: false})}
                                            changeKey={this.changeKey}
                                            />}
        </div> 
    }
}

export default AnimalCard
import React from "react";
import {animals} from '../services/datas'
import {init, prepareIdApi} from '../services/utils'
import Modale from './Modale'
import { Form } from "./Form";
import { Population } from "./PopulationCard";
import AnimalServices from "../services/animals-services";
import * as fields from "../services/datas"
import { Images } from "./Images";

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
            showImages: false,
            populationKey: 1,
            imageKey: 1,
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
                    } else if (typeof resp[key] === "string") {
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

    changeKey = (item) => {
        switch (item) {
            case "population":
                this.setState(state =>({
                    populationKey: state.populationKey + 1
                }))
            case "image":
                this.setState(state =>({
                    imageKey: state.imageKey + 1
                }))
        }
    }

    render() {
        return <div className="animalCard">
            {!this.state.wantModify && 
             !this.state.destructionSuccess && 
             !this.state.showPopulation &&
             !this.state.showImages &&
            <div className="one-card">
                <div className="mt-4">
                    <div className="btn-action mb-4">
                        <button type="button" 
                                className="btn btn-primary" 
                                onClick={this.onClick}>
                            modifier
                        </button>
                        <button type="button" 
                                className="btn btn-primary" 
                                onClick={this.onClick}>
                            supprimer
                        </button>
                        <button type="button" 
                                className="btn btn-primary" 
                                onClick={ () => this.setState({showPopulation: true})}>
                            populations
                        </button>
                        <button type="button" 
                                className="btn btn-primary" 
                                onClick={ () => this.setState({showImages: true})}>
                            images
                        </button>
                        <h1 className="mb-4 text-center">{this.state.animalName}</h1>
                    </div>
                </div> 
                <p className="w-100">{this.state.description}</p>
                <div className="row d-flex justify-content-center">
                    <div className="col-8 col-xl-5 bg-info pt-2 mb-2">
                        <h2 className="text-dark me-2">espèce:</h2>
                        <p className="text-center pb-2">{this.state.species[0]}</p>
                    </div>
                    <div className="col-8 col-xl-5 bg-info pt-2 ms-xl-2 mb-2">
                        <h2 className="text-dark me-2">régime:</h2>
                        <p className="text-center pb-2">{this.state.diet[0]}</p>
                    </div>
                    <div className="col-8 col-xl-5 bg-info pt-2 mb-2">
                        <h2 className="text-dark me-2">continents:</h2>
                        <p className="text-center pb-2">{this.state["continents"].map( c => <span key={c[1]}>{c[0]}</span>)}</p>
                    </div>
                </div>
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
                                                key={this.state.modaleKey}>
                                                vous vouler détruire cette fiche ?
                                               </Modale>
                }
            </div>}
            {this.state.wantModify && <Form 
                                        context="edition" 
                                        datas={this.state} 
                                        id={this.props.animalId} 
                                        fields={fields.animals}
                                        table="animals"
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
            {this.state.showImages && 
                <Images id={this.props.animalId} key={this.state.imageKey} changeKey={this.changeKey}>
                les images de l'animal: <span className="d-inline-block">{this.state.animalName}</span>
                </Images>
            }
        </div> 
    }
}

export default AnimalCard
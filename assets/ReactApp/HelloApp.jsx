import React from "react";
import CardList from "./CardList.jsx"
import {Form} from "./Form.jsx";
import AnimalCard from "./AnimalCard.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as fields from "../services/datas.js"

class HelloApp extends React.Component 
{  
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            url: "api/animals?",
            fullResearch: false,
            addAnimal: false,
            animalKey: 1
        }
    }

    handleResult = (url) => {
        this.setState({
            url: url,
            fullResearch: false
        })
    }

    createAnimal = () => {
        this.setState({
            addAnimal: true
        })
    }

    toggleResearch = () => {
        this.setState(state => ({
            keyForm: state.keyForm + 1,
            fullResearch: !state.fullResearch
        }))
    }

    handleAddAnimal = () => {
        this.setState({
            addAnimal: false
        })
    }

    handleChangeId = (id) => {
        if (id === this.state.id) {
            this.setState(state => ({
                animalKey: state.animalKey + 1
            }))
        }
        this.setState({
            id: id
        })
    }

    render() {
        let buttonResearchText = this.state.fullResearch ? 'recherche simple' : 'recherche détaillée'
        return <div>
                {this.state.id !== 0 ?
                    <AnimalCard animalId={this.state.id} changeId={this.handleChangeId} key={this.state.animalKey}/>
                    : <div>
                        {!this.state.addAnimal ? <div className="text-center">
                            <div className="new-action d-flex justify-center mt-4 mb-3">
                                <button className="btn btn-primary add-button detail me-2"
                                        onClick={ () => { this.setState({addAnimal: true})}}>
                                <FontAwesomeIcon icon={faPlus} className="me-2"/>
                                ajouter un animal
                                </button>
                                <button className="btn btn-primary" 
                                        onClick={this.toggleResearch}>{buttonResearchText}
                                </button>
                            </div>
                            {this.state.fullResearch ? 
                                <Form context="full-research" onResult={this.handleResult} fields={fields.animals} />:
                                <Form context="simple-research" onResult={this.handleResult} fields={fields.animals} />
                            }
                            <CardList url={this.state.url} changeId={this.handleChangeId}/>
                        </div>
                        : <Form context="creation" fields={fields.animals} table="animals" onAdd={this.handleAddAnimal}>
                            remplir les champs pour ajouter un animal à la collection
                        </Form>
                        }
                    </div>
                }
            </div>
    }
}

export default HelloApp


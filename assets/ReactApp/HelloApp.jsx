import React from "react";
import CardList from "./CardList.jsx"
import {Form} from "./Form.jsx";
import AnimalCard from "./AnimalCard.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";

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
        return <div className="h-100">
                {this.state.id !== 0 ?
                    <AnimalCard animalId={this.state.id} changeId={this.handleChangeId} key={this.state.animalKey}/>
                    : <>
                        {!this.state.addAnimal ? <div className="text-center h-100">
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
                                <Form context="full-research" onResult={this.handleResult} field="animals" />:
                                <Form context="simple-research" onResult={this.handleResult} field="animals" />
                            }
                            <CardList url={this.state.url} changeId={this.handleChangeId}/>
                        </div>
                        : <Form context="creation" field="animals" onAdd={this.handleAddAnimal}>
                            remplir les champs pour ajouter un animal à la collection
                        </Form>
                        }
                    </>
                }
            </div>
    }
}

export default HelloApp


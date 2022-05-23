import React from "react";
import CardList from "./CardList.jsx"
import {Form} from "./Form.jsx";
import AnimalCard from "./AnimalCard.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import * as fields from "../services/datas.js"
import Modale from "./Modale.jsx";
import AnimalServices from "../services/animals-services.js";

class HelloApp extends React.Component 
{  
    constructor(props) {
        super(props)
        this.state = {
            id: props.id,
            url: "api/animals?",
            fullResearch: false,
            addAnimal: false,
            animalKey: 1,
            keyForm: 1,
            visible: false,
            modaleKey: 1
        }
    }

    handleResult = (url) => {
        this.setState({
            url: url,
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

    newAnimal = async () => {
        console.log('dans le new animal')
        if (await AnimalServices.checkconnexion()) {
            this.setState({
                addAnimal: true
            })
        } else {
            console.log('pas connecté')
            this.setState(state => ({
                modaleKey: state.modaleKey + 1,
                visible: true
            }))
        }
    }

    handleChangeId = (id) => {
        console.log('dans le changeid de helloapp')
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
<<<<<<< HEAD
        console.log("animal id: ", this.state.id)
=======
        console.log('la clé de animal dans helloapp: ', this.state.animalKey)
>>>>>>> deleteFile
        let buttonResearchText = this.state.fullResearch ? 'recherche simple' : 'recherche détaillée'
        return <div key={this.state.animalKey}>
                {this.state.id !== 0 ?
                    <AnimalCard animalId={this.state.id} 
                                changeId={this.handleChangeId} />
                    : <div>
                        {!this.state.addAnimal ? <div>
                            <div className="new-action d-flex justify-center mt-4 mb-3">
                                <button className="btn btn-primary add-button detail me-2"
                                        onClick={this.newAnimal}>
                                <FontAwesomeIcon icon={faPlus} className="me-2"/>
                                ajouter un animal
                                </button>
                                <button className="btn btn-primary" 
                                        onClick={this.toggleResearch}>{buttonResearchText}
                                </button>
                            </div>
                            {this.state.fullResearch ? 
                                <div className="d-flex justify-content-center align-items-center">
                                    <Form context="full-research" 
                                        onResult={this.handleResult} 
                                        fields={fields.animals} 
                                        key={this.state.keyForm}>
                                    donnez des détails pour la recherche
                                    </Form>
                                </div>
                            :
                                <Form context="simple-research" 
                                      onResult={this.handleResult} 
                                      fields={fields.animals} 
                                      key={this.state.keyForm}/>
                            }
                            <CardList url={this.state.url} changeId={this.handleChangeId}/>
                        </div>
                        : <Form context="creation" 
                                fields={fields.animals} 
                                table="animals" 
                                onAdd={this.handleAddAnimal}>
                            remplir les champs pour ajouter un animal à la collection
                        </Form>
                        }
                    </div>
                }
                <Modale visible={this.state.visible}
                        context="add"
                        animalId={0}
                        key={this.state.modaleKey}
                />
            </div>
    }
}

export default HelloApp


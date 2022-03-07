import React from "react";
import CardList from "./CardList.jsx"
import {Form} from "./Form.jsx";
import AnimalCard from "./AnimalCard.jsx";

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
                    : <>
                        {!this.state.addAnimal ? <div>

                            <button className="btn btn-primary" onClick={this.toggleResearch}>{buttonResearchText}</button>
                            {this.state.fullResearch ? 
                                <Form context="fullResearch" onResult={this.handleResult} field="animal" />:
                                <Form context="simpleResearch" onResult={this.handleResult} field="animal" />
                            }
                            <button className="btn btn-primary" onClick={ () => { this.setState({addAnimal: true})}}>Ajouter un animal</button>
                            <CardList url={this.state.url} changeId={this.handleChangeId}/>
                        </div>
                        : <Form context="creation" field="animals" onAdd={this.handleAddAnimal}/>
                        }
                    </>
                }
                {/* {this.state.addAnimal && <Form context="creation" field="animal" onAdd={this.handleAddAnimal}/>} */}
            </div>
    }
}

export default HelloApp


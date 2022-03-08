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
        console.log('dans le tooggle')
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
        console.log('la recherche: ', this.state.fullResearch)
        console.log('le state: ', this.state)
        let buttonResearchText = this.state.fullResearch ? 'recherche simple' : 'recherche détaillée'
        console.log('le bouton recherche: ', buttonResearchText)
        return <div>
                {this.state.id !== 0 ?
                    <AnimalCard animalId={this.state.id} changeId={this.handleChangeId} key={this.state.animalKey}/>
                    : <>
                        {!this.state.addAnimal ? <div>

                            <button className="btn btn-primary" onClick={this.toggleResearch}>{buttonResearchText}</button>
                            {this.state.fullResearch ? 
                                <Form context="fullResearch" onResult={this.handleResult} field="animals" />:
                                <Form context="simpleResearch" onResult={this.handleResult} field="animals" />
                            }
                            <button className="btn btn-primary" onClick={ () => { this.setState({addAnimal: true})}}>Ajouter un animal</button>
                            <CardList url={this.state.url} changeId={this.handleChangeId}/>
                        </div>
                        : <Form context="creation" field="animals" onAdd={this.handleAddAnimal}>
                            remplir les champs pour ajouter un animal à la collection
                        </Form>
                        }
                    </>
                }
                {/* {this.state.addAnimal && <Form context="creation" field="animal" onAdd={this.handleAddAnimal}/>} */}
            </div>
    }
}

export default HelloApp


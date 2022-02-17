import React from "react";
import CardList from "./CardList.jsx"
import {Form} from "./Form.jsx";
import AnimalCard from "./AnimalCard.jsx";
import {prepareId} from './utils'

class HelloApp extends React.Component 
{  
    constructor(props) {
        super(props)
        this.state = {
            onlyOne: false,
            animalId: null,
            detail: false,
            justName: true,
            url: "api/animals?",
            fullResearch: false,
            keyForm: 1,
            addAnimal: false
        }
    }

    handleOneAnimal = (value, animalId) => {
        this.setState({
            onlyOne: value,
            animalId: animalId,
        })
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
    
    componentDidMount() {
        if (this.props.id) {
            let animalId = prepareId(this.props.id)
            this.setState({
                animalId: animalId,
                onlyOne: true
            })
        }
    }

    render() {
        let buttonResearchText = this.state.fullResearch ? 'recherche simple' : 'recherche détaillée'
        return <div>
                {!this.state.onlyOne && !this.state.addAnimal &&
                <div>
                    <button className="btn btn-primary" onClick={this.toggleResearch}>{buttonResearchText}</button>
                    {this.state.fullResearch ? 
                        <Form key={this.state.keyForm} context="fullResearch" onResult={this.handleResult} field="animal" />:
                        <Form key={this.state.keyForm} context="simpleResearch" onResult={this.handleResult} field="animal" />
                    }
                </div>}
                {this.state.onlyOne && !this.state.addAnimal && <AnimalCard  key={this.props.animalKey} animalId={this.state.animalId}/>}
                {!this.state.onlyOne && !this.state.addAnimal && !this.state.fullResearch && <div>
                    <button className="btn btn-primary" onClick={ () => { this.setState({addAnimal: true})}}>Ajouter un animal</button>
                    <CardList wantOneAnimal={this.handleOneAnimal} url={this.state.url} />
                </div>}
                {this.state.addAnimal && <Form context="creation" field="animal" onAdd={this.handleAddAnimal}/>}
            </div>
    }
}

export default HelloApp


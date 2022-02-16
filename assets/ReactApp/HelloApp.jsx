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
        }
    }

    handleOneAnimal = (value, animalId) => {
        this.setState({
            onlyOne: value,
            animalId: animalId,
        })
    }

    // recover value from FormResearch with wantDetail
    handleDetail = (value) => {
        this.setState({
            detail: value
        })
    }

    handleResult = (url, ) => {
        this.setState({
            url: url,
        })
    }

    createAnimal = () => {
        this.setState({
            addAnimal: true
        })
    }
    
    componentDidMount() {
        console.log('je monte le hellapp')
        if (this.props.id) {
            console.log('un id dans helloapp: ', this.props.id)
            let animalId = prepareId(this.props.id)
            this.setState({
                animalId: animalId,
                onlyOne: true
            })
        }
    }

    render() {
        return <div>
                {this.state.onlyOne && !this.state.addAnimal && <AnimalCard  animalId={this.state.animalId}/>}
                {!this.state.onlyOne && !this.state.addAnimal && <div>
                    <button className="btn btn-primary" onClick={ () => { this.setState({addAnimal: true})}}>Ajouter un animal</button>
                    <Form context="fullResearch" onResult={this.handleResult} field="animal"/>
                    <CardList wantOneAnimal={this.handleOneAnimal} url={this.state.url} />
                </div>}
                {this.state.addAnimal && <Form context="creation" field="animal"/>}
            </div> 
    }
}

export default HelloApp


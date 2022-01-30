import React from "react";
import CardList from "./CardList.jsx"
import FormResearch from "./FormResearch.jsx";
import AnimalCard from "./AnimalCard.jsx";

class HelloApp extends React.Component 
{  
    constructor(props) {
        super(props)
        this.state = {
            onlyOne: false,
            animalId: null,
            detail: false,
            justName: true
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

    // change animalName with value from FormResearch component
    handleIfJustName = (bool) => {
        this.setState({
            justName: bool,
        })
    }

    render() {
        console.log('le onlyone: ', this.state.onlyOne)
        console.log('animal id: ', this.state.animalId)
        return <div>
                {this.state.onlyOne && <AnimalCard  animalId={this.state.animalId}/>}
                <FormResearch wantName={this.handleIfJustName}/>
                {this.state.justName && <CardList wantOneAnimal={this.handleOneAnimal} url={this.state.url}/>}
            </div>
        
    }
}

export default HelloApp


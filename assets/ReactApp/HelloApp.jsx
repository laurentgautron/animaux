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
            animalName: null
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

    handleAnimalName = (value) => {
        console.log('la value de la recherche: ', value)
        this.setState({
            animalName: value
        })
    }

    render() {
        console.log('un nom: ', this.state.animalName)
        return <div>
                {this.state.onlyOne && <AnimalCard  animalId={this.state.animalId}/>}
                {!this.state.onlyOne && !this.state.detail && <div>
                    <div className="form-group my-5">
                        <FormResearch wantDetail={this.handleDetail} wantName={this.handleAnimalName}/>
                    </div>
                    <CardList wantOneAnimal={this.handleOneAnimal} animalName={this.state.animalName}/>
                </div>}
                {!this.state.onlyOne && this.state.detail && <div>En détail</div>}
            </div>
        
    }
}

export default HelloApp
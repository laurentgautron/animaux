import React from "react";
import CardList from "./CardList.jsx"
import FormResearch from "./FormResearch.jsx";
import AnimalCard from "./AnimalCard.jsx";
import ResearchDetail from "./ResearchDetail.jsx";

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
        console.log('le justname: ', this.state.justName)
        console.log('des données', this.props.datas)
        return <div>
                <FormResearch wantName={this.handleIfJustName}/>
                {this.state.justName && <CardList wantOneAnimal={this.handleOneAnimal} url={this.state.url}/>}
                {this.state.onlyOne && <AnimalCard animalName={this.state.animalId}/>}
            </div>
        
    }
}

export default HelloApp


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

    // change animalName with value from FormResearch component
    handleIfJustName = (bool) => {
        this.setState({
            justName: bool,
        })
    }

    handleResult = (url, ) => {
        this.setState({
            url: url,
        })
    }

    componentDidMount() {
        console.log('dans le helloapp le id des props: ', this.props.id)
        if (this.props.id) {
            console.log('je renseigne animalID')
            this.setState({
                animalId: '/api/animals/' + this.props.id,
                onlyOne: true
            })
        }
    }


    render() {
        return <div>
                {this.state.onlyOne && <AnimalCard  animalId={this.state.animalId}/>}
                {!this.state.onlyOne && <FormResearch wantName={this.handleIfJustName} onResult={this.handleResult}/>}
                {!this.state.onlyOne && <CardList wantOneAnimal={this.handleOneAnimal} url={this.state.url} />}
            </div>
        
    }
}

export default HelloApp


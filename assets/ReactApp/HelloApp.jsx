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
            detail: false
        }
    }

    handleOneAnimal = (value, animalId) => {
        this.setState({
            onlyOne: value,
            animalId: animalId
        })
    }

    handleDetail = (value) => {
        this.setState({
            detail: value
        })
    }

    render() {
        return <div>
                {this.state.onlyOne && <AnimalCard  animalId={this.state.animalId}/>}
                {!this.state.onlyOne && !this.state.detail && <div>
                    <div className="form-group my-5">
                        <FormResearch wantDetail={this.handleDetail}/>
                    </div>
                    <CardList wantOneAnimal={this.handleOneAnimal}/>
                </div>}
                {!this.state.onlyOne && this.state.detail && <div>En détail</div>}
            </div>
        
    }
}

export default HelloApp
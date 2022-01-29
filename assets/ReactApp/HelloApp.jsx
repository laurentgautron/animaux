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
    handleUrl = (value) => {
        this.setState({
            url: value
        })
    }

    render() {
        console.log('des données', this.props.datas)
        return <div>
                {this.state.onlyOne && <AnimalCard  animalId={this.state.animalId}/>}
                {!this.state.onlyOne && !this.state.detail && <div>
                    <div className="form-group my-5">
                        <FormResearch wantDetail={this.handleDetail} wantName={this.handleUrl}/>
                    </div>
                    <CardList wantOneAnimal={this.handleOneAnimal} url={this.state.url}/>
                </div>}
                {this.state.detail && <ResearchDetail />}
            </div>
        
    }
}

export default HelloApp


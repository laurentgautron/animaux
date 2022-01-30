import React from "react";
import AnimalForm from "./AnimalForm";
import {fullFields, oneField} from './datas'

class FormResearch extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            animalSearchValue: null,
            fullForm: false
        }
    }

    handleChange = ev => {
        // change aniamlName
        this.setState({
            animalSearchValue: ev.target.value
        })
    }

    buttonToogle = () => {
        if (this.state.fullForm) {
            return <button onClick={this.toggle}>simple recherche</button>
        } else {
            return <button onClick={this.toggle}>recherche détaillée</button>
        }
    }

    toggle = () => {
        this.props.wantName(this.state.fullForm)
        this.setState({
            fullForm: !this.state.fullForm
        })
    }

    // return url in HelloApp
    handleResearchUrl = (url) => {
        console.log('le url que je passe dans formResearch: ', url ) 
        this.props.onResult(url)
    }

    render() {
        return <div>
           {this.state.fullForm &&  <AnimalForm fields={fullFields} getResearchUrl={this.handleResearchUrl}/>}
           {!this.state.fullForm &&  <AnimalForm fields={oneField} getResearchUrl={this.handleResearchUrl}/>}
           {this.buttonToogle()}
        </div>
    }
}

export default FormResearch
import React from "react";
import { Form } from "./Form";

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
        console.log('je toogle: ')
        console.log('je renvois au wantName: ', this.state.fullForm)
        // this.props.wantName(this.state.fullForm)
        this.setState({
            fullForm: !this.state.fullForm
        })
    }

    // return url in HelloApp
    handleResearchUrl = (url, bool) => {
        console.log('je transmet url ', url, 'vers helloapp')
        this.props.onResult(url)
    }

    render() {
        return <div>
            {this.state.fullForm && <Form type="fullResearch" getResearchUrl={this.handleResearchUrl}/>}
            {!this.state.fullForm && <Form type="simpleResearch" getResearchUrl={this.handleResearchUrl}/>}
            {this.buttonToogle()}
        </div>
    }
}

export default FormResearch
import React from "react";
import AnimalForm from "./AnimalForm";
import {formFields} from './datas'

class FormResearch extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            animalSearchValue: null
        }
    }

    // change url in HelloApp with wantName
    handleSubmit = ev => {
        ev.preventDefault()
        const url = "api/animals?name=" + this.state.animalSearchValue
        this.props.wantName(url)
    }

    handleChange = ev => {
        // change aniamlName
        this.setState({
            animalSearchValue: ev.target.value
        })
    }

    render() {
        console.log('les fields: ', formFields)
        return <div>
            <AnimalForm fields={formFields} />
            {/* <form className="animalResearch d-flex justify-content-center justify-content-sm-start align-items-center flex-wrap"
                        onSubmit={this.handleSubmit}>
                <input type="text" 
                    name="animalName" 
                    className="mx-3 p-1 mt-2" 
                    placeholder="Ex: Lion"
                    onChange={this.handleChange}/>
                <button type="submit" className="btn research mt-2">Rechercher</button>
                <button onClick={ () => this.props.wantDetail(true)} className="mx-2 mt-2" role="button">Recherche détaillée</button>
            </form> */}
        </div>
    }
}

export default FormResearch
import React from "react";

class FormResearch extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            animalValue: null
        }
    }

    handleSubmit = ev => {
        ev.preventDefault()
        console.log(this.state.animalValue)
        fetch('/api/animals?name=' + this.state.animalValue)
        .then(response => {if (response.ok) {return response.json()}} )
        .then(resp => console.log(resp))
        console.log("je cherche")
    }

    handleClick = () => {
        this.props.wantDetail(true)
    }

    handleChange = ev => {
        this.setState({
            animalValue: ev.target.value
        })
    }

    render() {
        return <form className="animalResearch d-flex justify-content-center justify-content-sm-start align-items-center flex-wrap"
                     onSubmit={this.handleSubmit}>
            <input type="text" 
                   name="animalName" 
                   className="mx-3 p-1 mt-2" 
                   placeholder="Ex: Lion"
                   onChange={this.handleChange}/>
            <button type="submit" className="btn research mt-2">Rechercher</button>
            <a onClick={this.handleClick} className="mx-2 mt-2" role="button">Recherche détaillée</a>
        </form>
    }
}

export default FormResearch
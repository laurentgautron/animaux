import React from "react";

class AnimalCard extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            animalName: null
        }
    }

    componentDidMount() {
        fetch(this.props.animalId, {
            method: "GET",
        })
        .then( response => {if (response.ok) { return response.json() }} )
        .then( resp => this.setState({
            animalName: resp.name
        }))
    }

    render() {
        return<>
            <h1>{this.state.animalName}</h1>
            <a href="/login">connexion</a>
        </> 
    }
}

export default AnimalCard
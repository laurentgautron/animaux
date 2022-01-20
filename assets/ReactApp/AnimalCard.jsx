import React from "react";

class AnimalCard extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            animalId: this.props.animalId,
            animalName: null
        }
    }

    componentDidMount() {
        fetch(this.state.animalId, {
            method: "GET",
        })
        .then( response => {if (response.ok) { return response.json() }} )
        .then( resp => this.setState({
            animalName: resp.name
        }))
    }

    render() {
        return <h1>{this.state.animalName}</h1>
    }
}

export default AnimalCard
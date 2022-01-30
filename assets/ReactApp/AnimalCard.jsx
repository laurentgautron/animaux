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
        console.log('dans animalcard le animal id: ', this.props.animalId)
        fetch(this.props.animalId, {
            method: "GET",
        })
        .then( response => {if (response.ok) { return response.json() }} )
        .then( resp => {
            console.log('la resp de animal card: ', resp.animalName)
            this.setState({
                animalName: resp.animalName
            })
        }
        )
    }

    render() {
        return<>
            <h1>{this.state.animalName}</h1>
            <a href="/login">connexion</a>
        </> 
    }
}

export default AnimalCard
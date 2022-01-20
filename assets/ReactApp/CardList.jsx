import React from "react";

class CardList extends React.Component
{
    constructor(props) {
        super(props)
        this.state  = {
            animals: []
        }
    }

    handleClick(idValue) {
        this.props.wantOneAnimal(true, idValue)
    }

    componentDidMount() {
        console.log('ça marche')
        fetch('api/animals/')
        .then( response => { return response.json() } 
        )
        .then( resp => {
            this.setState({
                animals: resp["hydra:member"]
            })
        })
    }

    render() {
        return <div className="row animal_container container justify-content-center mt-5 p-0 mx-auto">
                { this.state.animals.map( element => {
                    return  <div key={element.id} 
                                role="button"
                                className="animalCard col-sm-3 m-4 px-3 d-flex justify-content-center align-items-center"
                                onClick={ () => this.handleClick(element["@id"]) }>
                                <h2 className="text-center">{ element.name }</h2>
                            </div>
                    })
                }
        </div>
    }
}

export default CardList
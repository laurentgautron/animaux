import React from "react";

class CardList extends React.Component
{
    constructor(props) {
        super(props)
        this.state  = {
            animalName: null,
            animalsPage: 1,
            animals: [],
            animalsNumber: 0
        }
    }

    // handleClick(idValue) {
    //     this.props.wantOneAnimal(true, idValue)
    // }

    // faire une fonction qui reprend le fetch

    finAnimalList = name => {
        let url = ""
        console.log('le nom cherché: ', name)
        if (name === undefined) {
            url = 'api/animals'
        } else {
            url = '/api/animals?&name=' + name + '&page=' + this.state.animalsPage
        }
        fetch(url)
        .then( response => { return response.json() } 
        )
        .then( resp => {
            this.setState({
                animals: resp["hydra:member"],
                animalsNumber: resp["hydra:totalItems"]
            })
        })
    }

    componentDidMount() {
        this.finAnimalList()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.animalName !== this.props.animalName) {
            this.finAnimalList(this.props.animalName)
        }
    }

    render() {
        console.log('les animaux', this.state.animals)
        console.log('le nom: ', this.state.animalName)
        return <div>
            <div className="row animal_container container justify-content-center mt-5 p-0 mx-auto">
                    {this.state.animals.map( element => {
                        return  <div key={element.id} 
                                    role="button"
                                    className="animalCard col-sm-3 m-4 px-3 d-flex justify-content-center align-items-center"
                                    onClick={ () => this.props.wantOneAnimal(true, element["@id"]) }>
                                    <h2 className="text-center">{ element.name }</h2>
                                </div>
                        })
                    }
            </div>
            <div className="pagination">il y a {this.state.animalsNumber} animaux</div>
        </div>
    }
}

export default CardList
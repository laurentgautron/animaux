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

    componentDidMount() {
        console.log('le nom passé: ', this.state.animalName)
        let url = ""
        console.log('il y a des animaux: ', !this.state.animalName === null)
        if (this.state.animalName === null) {
            url = 'api/animals'
        } else {
            url = '/api/animlas?&name=' + this.state.animalName + '&page=' + this.state.animalsPage
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

    componentDidUpdate(prevProps, prevState) {
        console.log('on update')
        console.log('avant: ', prevProps.animalName)
        console.log('après: ', this.props.animalName)
        if (prevState.animalName !== this.state.animalName) {
            console.log('les noms sont différents !')
            this.setState({
                animalName: this.props.animalName
            })
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
import React from "react";
import Pagination from "./Pagination";

class CardList extends React.Component
{
    constructor(props) {
        super(props)
        this.state  = {
            animalName: "",
            actualAnimalsPage: 1,
            animals: [],
            animalsNumber: 0,
            view: {},
        }
    }

    // handleClick(idValue) {
    //     this.props.wantOneAnimal(true, idValue)
    // }

    finAnimalList = (name = this.state.animalName) => {
        let url = ""
        console.log('le nom cherché: ', name)
        if (name === undefined) {
            url = 'api/animals'
        } else {
            url = '/api/animals?&name=' + name + '&page=' + this.state.actualAnimalsPage
        }
        fetch(url)
        .then( response => { return response.json() } 
        )
        .then( resp => {
            this.setState({
                animals: resp["hydra:member"],
                animalsNumber: resp["hydra:totalItems"],
                view: resp["hydra:view"]
            })
        })
    }

    componentDidMount() {
        this.finAnimalList()
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('je fait un update')
        if ( (prevProps.animalName !== this.props.animalName)) {
            this.setState({
                animalName: this.props.animalName
            })
            this.finAnimalList(this.props.animalName)
        }
        if (prevState.actualAnimalsPage !== this.state.actualAnimalsPage) {
            this.finAnimalList()
        }
    }


    handlePage = (activePage) => {
        console.log('on change la page dans la carlist')
        this.setState({
            actualAnimalsPage: activePage
        })
    }

    render() {
        console.log('je fait un rendu')
        console.log('les animaux', this.state.animals)
        console.log('le nom: ', this.state.animalName)
        console.log('la page sur cardlist: ', this.state.actualAnimalsPage)
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
            <Pagination view={this.state.view} onPage={this.handlePage}/>
        </div>
    }
}

export default CardList
import React from "react";
import Pagination from "./Pagination";

class CardList extends React.Component
{
    constructor(props) {
        super(props)
        this.state  = {
            animalList: [],
            actualAnimalsPage: 1,
            url: "api/animals?",
            animalsNumber: 0,
            view: {},
        }
    }

    // handleClick(idValue) {
    //     this.props.wantOneAnimal(true, idValue)
    // }

    finAnimalList = (url) => {
        let urlAnimals = url + "&page=" + this.state.actualAnimalsPage
        console.log('url appelée  dans cardlist: ', urlAnimals)
        fetch(urlAnimals)
        .then( response => { return response.json() } 
        )
        .then( resp => {
            this.setState({
                animalList: resp["hydra:member"],
                animalsNumber: resp["hydra:totalItems"],
                view: resp["hydra:view"]
            })
        })
    }

    componentDidMount() {
        this.finAnimalList(this.state.url)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('on update dans le cardlist')
        console.log('avant: ', prevProps.url)
        console.log('apres: ', this.props.url)
        if (prevProps.url !== this.props.url) {
            this.setState({
                actualAnimalsPage: 1,
                url: this.props.url
            })
            this.finAnimalList(this.props.url)
        }
        if (prevState.actualAnimalsPage !== this.state.actualAnimalsPage) {
            console.log('la page est changée')
            this.finAnimalList(this.state.url)
        }
        // if number page change: from pagination Component
        
    }


    handlePage = (activePage) => {
        console.log('on change la page dans la carlist')
        this.setState({
            actualAnimalsPage: activePage
        })
    }

    render() {
        console.log('la liste des animauxde cardlist: ', this.state.animalList)
        return <div>
            <div className="row animal_container container justify-content-center mt-5 p-0 mx-auto">
                    {this.state.animalList.map( element => {
                        return  <div key={element.id} 
                                    role="button"
                                    className="animalCard col-sm-3 m-4 px-3 d-flex justify-content-center align-items-center"
                                    onClick={ () => this.props.wantOneAnimal(true, element["@id"]) }>
                                    <h2 className="text-center">{ element.name }</h2>
                                </div>
                        })
                    }
            </div>
            <Pagination view={this.state.view} onPage={this.handlePage} page={this.state.actualAnimalsPage}/>
        </div>
    }
}

export default CardList
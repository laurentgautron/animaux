import React from "react";
import Pagination from "./Pagination";

class CardList extends React.Component
{
    constructor(props) {
        super(props)
        this.state  = {
            animalList: [],
            url: 'api/animals?',
            animalsNumber: 0,
            view: {},
            key: 1,
        }
    }

    findAnimalList = (url) => {
        console.log('dans le fetch de cardlist: ', url)
        let urlAnimals = url
        console.log('ce que je fetch dans cardlist: ', urlAnimals)
        fetch(urlAnimals)
        .then( response => { return response.json() } 
        )
        .then( resp => {
            console.log('la reponse de cardlist: ', resp)
            this.setState({
                animalList: resp["hydra:member"],
                animalsNumber: resp["hydra:totalItems"],
                view: resp["hydra:view"],
            })
        })
    }

    componentDidMount() {
        this.findAnimalList(this.state.url)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('avant dans le cardlist: ', prevState.url)
        console.log('apres dans cardlist: ', this.state.url)
        if (prevState.url !== this.state.url) {
            console.log('on change animal list')
            
            this.findAnimalList(this.state.url)
        } else if (prevProps.url !== this.props.url) {
            this.setState({
                url: this.props.url
            })
            this.findAnimalList(this.props.url)
        }
    }


    handlePage = (activePage) => {
        console.log('actualise avec: ', activePage)
        if (this.state.url + "page=1" !== activePage)
        this.setState({
            url: activePage
        })
    }

    render() {
        console.log('dans le cardlist url: ', this.state.url)
        console.log('la view de cardlist: ', this.state.view)
        return <div>
            <div className="row animal_container container justify-content-center mt-5 p-0 mx-auto">
                {this.state.animalList.map( element => {
                    return  <div key={element["@id"]} 
                                role="button"
                                className="animalCard col-sm-3 m-4 px-3 d-flex justify-content-center align-items-center"
                                onClick={ () => this.props.wantOneAnimal(true, element["@id"]) }>
                                <h2 className="text-center">{ element["animalName"] }</h2>
                            </div>
                    })
                }
            </div>
            {this.state.animalList.length !== 0 && <Pagination view={this.state.view} onPage={this.handlePage} key={this.state.key}/>}
        </div>
    }
}

export default CardList
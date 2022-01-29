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
            key: 1,
        }
    }

    findAnimalList = (url, page = this.state.actualAnimalsPage) => {
        console.log('dans le fetch de cardlist: ', url)
        let urlAnimals = url + "&page=" + page
        fetch(urlAnimals)
        .then( response => { return response.json() } 
        )
        .then( resp => {
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
        if (prevProps.url !== this.props.url) {
            this.setState( (state) => ({
                actualAnimalsPage: 1,
                url: this.props.url,
                key: state.key + 1
            }))
            this.findAnimalList(this.props.url, 1)
        } else if (prevState.actualAnimalsPage !== this.state.actualAnimalsPage) {
            this.findAnimalList(this.state.url)
        }
        // if number page change: from pagination Component
        
    }


    handlePage = (activePage) => {
        this.setState({
            actualAnimalsPage: activePage
        })
    }

    render() {
        return <div>
            <div className="row animal_container container justify-content-center mt-5 p-0 mx-auto">
                {this.state.animalList.map( element => {
                    return  <div key={element["@id"]} 
                                role="button"
                                className="animalCard col-sm-3 m-4 px-3 d-flex justify-content-center align-items-center"
                                onClick={ () => this.props.wantOneAnimal(true, element["@id"]) }>
                                <h2 className="text-center">{ element.name }</h2>
                            </div>
                    })
                }
            </div>
            <Pagination view={this.state.view} onPage={this.handlePage} key={this.state.key}/>
        </div>
    }
}

export default CardList
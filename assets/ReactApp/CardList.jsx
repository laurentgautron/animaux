import React from "react";
import { async } from "regenerator-runtime";
import AnimalServices from "../services/animals-services";
import Pagination from "./Pagination";


class CardList extends React.Component
{
    constructor(props) {
        super(props)
        this.state  = {
            animalList: [],
            url: '/api/animals?',
            animalsNumber: 0,
            view: {},
            key: 1,
        }
    }

    makeUrlNumber = (id) => {
        let idNumber = id.split('/')
        return idNumber[idNumber.length-1]
    }

    findAnimalList = async (url) => {
        const response = await fetch(url)
        const rep = await response.json()
        let featureJoinAnimal = []
        for (const animal of rep["hydra:member"]) {
            const featured = await AnimalServices.getfeaturedImage(animal["@id"])
            featureJoinAnimal.push([animal, featured])
        }

        this.setState({
            animalList: featureJoinAnimal,
            animalsNumber: rep["hydra:totalItems"],
            view: rep["hydra:view"]
        })
    }

    componentDidMount() {
        this.findAnimalList(this.props.url)
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.url !== this.state.url) {
            this.findAnimalList(this.state.url)
        } else if (prevProps.url !== this.props.url) {
            this.setState( state => ({
                key: state.key + 1,
                animalList: []
            }))
            this.findAnimalList(this.props.url)
        } 
    }

    handlePage = (activePage) => {
        this.setState({
            url: activePage
        })
    }

    render() {
        return <div className="card-list">
            <ul>
                {this.state.animalList && this.state.animalList.map( element => {
                    return <li key={element[0]['@id']}>
                            <a href="#beginning" 
                                className="animal-card col-sm-3 m-4 px-3"
                                key={element[0]["@id"]}
                                onClick={ () => this.props.changeId(this.makeUrlNumber(element[0]["@id"])) }>
                                <h2 className="text-center">{ element[0]["animalName"] }</h2>
                                {element[1][0] && <img src={element[1][0]['imageUrl']}></img>}
                            </a>
                        </li>
                    })
                }
            </ul>
            {this.state.animalList.length !== 0 ? 
                <Pagination view={this.state.view} onPage={this.handlePage} key={this.state.key}/> :
                <div>pas de résultat</div>
            }
        </div>
    }
}

export default CardList
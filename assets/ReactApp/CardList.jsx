import React from "react";
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
        this.controller = new AbortController()
    }


    findAnimalList = async (url) => {
        const response = await fetch(url, {signal: this.controller.signal})
        const rep = await response.json()
        this.setState({
            animalList: rep["hydra:member"],
            animalsNumber: rep["hydra:totalItems"],
            view: rep["hydra:view"]
        })
    }

    componentDidMount() {
        this.findAnimalList(this.state.url)
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

    componentWillUnmount() {
        this.controller.abort()
    }


    handlePage = (activePage) => {
        this.setState({
            url: activePage
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
                                <h2 className="text-center">{ element["animalName"] }</h2>
                            </div>
                    })
                }
            </div>
            {this.state.animalList.length !== 0 && <Pagination view={this.state.view} onPage={this.handlePage} key={this.state.key}/>}
            {this.state.animalList.length === 0 && <div>pas de résultat</div>}
        </div>
    }
}

export default CardList
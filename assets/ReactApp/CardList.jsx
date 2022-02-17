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
        console.log('je fais find: ', url)
        const response = await fetch(url)
        const rep = await response.json()
        this.setState({
            animalList: rep["hydra:member"],
            animalsNumber: rep["hydra:totalItems"],
            view: rep["hydra:view"]
        })
    }

    componentDidMount() {
        console.log(' je monte le cardlist avec: ', this.props.url)
        this.findAnimalList(this.props.url)
    }

    componentDidUpdate(prevProps, prevState) {
        console.log('les props avant dans cardlist: ', prevProps.url)
        console.log('les props après dans cardlist: ', this.props.url)
        console.log('je suis dans le update')
        if (prevState.url !== this.state.url) {
            console.log('le change url dans cardlist et fait larecherche animal:', this.state.url)
            this.findAnimalList(this.state.url)
        } else if (prevProps.url !== this.props.url) {
            console.log('les props qui changent: ', this.props.url)
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
        console.log('les props de cardList: ', this.props)
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
            {this.state.animalList.length !== 0 ? 
                <Pagination view={this.state.view} onPage={this.handlePage} key={this.state.key}/> :
                <div>pas de résultat</div>
            }
        </div>
    }
}

export default CardList
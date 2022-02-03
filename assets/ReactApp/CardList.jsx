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
    }

    findAnimalList = (url) => {
        console.log('je fait un find list avec : ', url)
        fetch(url)
        .then( response => { 
            console.log('la response: ', response)
            return response.json() 
        } 
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
        console.log('le prevprops: ', prevProps.url)
        console.log('le props: ', this.props.url)
        console.log('le prevstate: ', prevState.url)
        console.log('le state: ', this.state.url)
        if (prevState.url !== this.state.url) {
            console.log('je fais un find pour le state: ', this.state.url)
            this.findAnimalList(this.state.url)
        } else if (prevProps.url !== this.props.url) {
            console.log('le props url change: ', this.props.url)
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
        console.log('rendu de cardlist avec url: ', this.props.url)
        console.log('animal list: ', this.state.animalList)
        console.log('la view: ', this.state.view)
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
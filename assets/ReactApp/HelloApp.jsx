import React from "react";


class HelloApp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            animals: []
        }
    }

    componentDidMount() {
        console.log('ça marche')
        fetch('api/animals/')
        .then( response => 
            { if (response.ok) { return response.json() } 
        })
        .then( resp => {
            let animalList = resp["hydra:member"]
            this.setState({
                animals: animalList
            })
            console.log(this.state.animals)
        })
    }

    render() {
        return (
            <>
            <div className="form-group my-5">
                    <form className="animalResearch d-fle flex-wrap">
                        <input type="text" name="animalName" className="mx-3 p-1" placeholder="Ex: Lion"/>
                        <button type="submit" className="btn btn-info">Rechercher</button>
                    </form>
            </div>
            <div className="row animal_container container ms-auto mt-5">
                    { this.state.animals.map( element => {
                        return <div key={element.id} 
                                    className="col-sm-3 animal m-4 px-3 d-flex justify-content-center align-items-center">
                                    <h2 className="text-center">{ element.name }</h2>
                                </div>
                        })
                    }
            </div>
            </>
        )
    }
}

export default HelloApp
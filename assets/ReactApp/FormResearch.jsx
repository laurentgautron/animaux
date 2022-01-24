import React from "react";

class FormResearch extends React.Component
{
    constructor(props) {
        super(props)
        this.state = {
            animalSearchValue: null
        }
    }

    handleSubmit = ev => {
        ev.preventDefault()
        console.log(this.state.animalSearchValue)
        this.props.wantName(this.state.animalSearchValue)
    }

    // use wnaDetail to recover variable in HelloApp
    // handleClick = () => {
    //     this.props.wantDetail(true)
    // }

    handleChange = ev => {
        // change aniamlName in HelloApp
        this.setState({
            animalSearchValue: ev.target.value
        })
    }

    render() {
        return <div>
            <form className="animalResearch d-flex justify-content-center justify-content-sm-start align-items-center flex-wrap"
                        onSubmit={this.handleSubmit}>
                <input type="text" 
                    name="animalName" 
                    className="mx-3 p-1 mt-2" 
                    placeholder="Ex: Lion"
                    onChange={this.handleChange}/>
                <button type="submit" className="btn research mt-2">Rechercher</button>
                <button onClick={ () => this.props.wantDetail(true)} className="mx-2 mt-2" role="button">Recherche détaillée</button>
            </form>
        </div>
    }
}

export default FormResearch
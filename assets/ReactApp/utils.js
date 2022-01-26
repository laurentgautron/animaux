export default function finAnimalList  (name = this.state.animalName) {
    let url = ""
    if (name === "") {
        url = 'api/animals'
    } else {
        url = '/api/animals?&name=' + name + '&page=' + this.state.actualAnimalsPage
    }
    fetch(url)
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
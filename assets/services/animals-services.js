export default class AnimalServices {
    static checkconnexion = async () => {
        let response = await fetch('/checkUserConnexion')
        if (response.ok) {
            return response.json()
        } else {
            return response.status
        }
    }

    static getfeaturedImage = async (animal) => {
        const url = '/api/image_animals?featured=true&animal=' + animal
        let response = await fetch(url)
        console.log('reponse de fetch: ', response)
        if (response.ok) {
            return response.json()
        } else {
            return response.status
        }
    }
}
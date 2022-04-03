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
        if (response.ok) {
            return response.json()
        } else {
            return response.status
        }
    }

    static getDefaultFeaturedImage = async (animal) => {
        const url = 'api/image_animals?&animal=' + animal
        let response = await fetch(url)
        if (response.ok) {
            return response.json()
        } else {
            return response.status
        }
    }
}
export default class AnimalServices {
    static checkconnexion = async () => {
        let response = await fetch('/checkUserConnexion')
        if (response.ok) {
            return response.json()
        } else {
            return response.status
        }
    }
}
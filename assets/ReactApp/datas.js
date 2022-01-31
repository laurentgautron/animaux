const fullFields = [
    {'labelName': 'nom', 'type': 'text', 'entityField': 'animalName', 'table': 'animals'},
    {'labelName': 'régime', 'type': 'select', 'entityField': 'diet', 'table': 'diets'},
    {'labelName': 'espèce', 'type': 'select', 'entityField': 'species', 'table': 'species'},
    {'labelName': 'continent', 'type': 'select', 'entityField': 'continents', 'table': 'continents'}
]

const oneField = [
    {'labelName': 'nom', 'type': 'text', 'entityField': 'animalName', 'table': 'animals'}
]

const stateForm = {
    animalName: '',
    diet: '',
    species: '',
    continents: ''
}

export {fullFields, stateForm, oneField}
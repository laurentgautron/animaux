const fullFields = [
    {'labelName': 'nom', 'type': 'text', 'entityField': 'animalName', 'table': 'animals'},
    {'labelName': 'régime', 'type': 'select', 'entityField': 'dietName', 'table': 'diets'},
    {'labelName': 'espèce', 'type': 'select', 'entityField': 'speciesName', 'table': 'species'},
    {'labelName': 'continent', 'type': 'select', 'entityField': 'continentName', 'table': 'continents'}
]

const oneField = [
    {'labelName': 'nom', 'type': 'text', 'entityField': 'animalName', 'table': 'animals'}
]

const stateForm = {
    animalName: '',
    diet: '',
    species: '',
    continent: ''
}

export {fullFields, stateForm, oneField}
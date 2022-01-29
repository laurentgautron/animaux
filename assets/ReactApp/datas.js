const formFields = [
    {'labelName': 'nom', 'type': 'text', 'entityField': 'animalName', 'table': 'animals'},
    {'labelName': 'régime', 'type': 'select', 'entityField': 'dietName', 'table': 'diets'},
    {'labelName': 'espèce', 'type': 'select', 'entityField': 'speciesName', 'table': 'species'},
    {'labelName': 'continent', 'type': 'select', 'entityField': 'continentName', 'table': 'continents'}
]
const stateForm = {
    animalName: null,
    diet: null,
    species: null,
    continent: null
}

export {formFields, stateForm}
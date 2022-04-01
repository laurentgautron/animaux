const needIdTable = ['world_populations']

const trad = {
    'animalName': 'Nom de l\'animal',
    'diets': 'régime',
    'continents': 'continents',
    'species': 'espèce',
    'description': 'description',
    'population': "population",
    'year': 'année'
}

const animals = {
    text: [{
        table: 'animals', 
        primaryEntity: "animalName", 
        context: [
            'simple-research', 
            'full-research', 
            'creation', 'edition'
        ]
    }],
    textarea: [{
        table: 'animals', 
        primaryEntity: "description", 
        context: [
            'creation', 'edition'
        ]
    }],
    select: [
        {table: 'diets', primaryEntity: 'diet', context: ['full-research', 'creation', 'edition']},
        {table: 'species', primaryEntity: 'species', context: ['full-research', 'creation', 'edition']},
        {table: 'continents', primaryEntity: 'continents', multiple: true, context: ['full-research', 'creation', 'edition']}
    ],
}

const worldPopulations = {
    number: [
        {table: 'worldPopulation', primaryEntity: "population", context: ['creation', 'edition']},
    ],
    text: [
        {table: 'worldPopulation', primaryEntity: "year", context: ['creation']},
    ],

}

const imageAnimal = {
    file: [
        {table: 'imageAnimal', primaryEntity: "imageFile", context: ['creation']}
    ],
    Boolean:[
        {table: 'imageAnimal', primaryEntity: "featured", context: ["creation"]}]

}

export {animals, worldPopulations, needIdTable, trad, imageAnimal}
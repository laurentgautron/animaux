const tableList = ['animal', 'worldPopulation']

const needIdTable = ['world_populations']

const animals = {
    text: [{
        table: 'animals', 
        primaryEntity: "animalName", 
        context: [
            'simpleResearch', 
            'fullResearch', 
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
        {table: 'diets', primaryEntity: 'diet', context: ['fullResearch', 'creation', 'edition']},
        {table: 'species', primaryEntity: 'species', context: ['fullResearch', 'creation', 'edition']},
        {table: 'continents', primaryEntity: 'continents', multiple: true, context: ['fullResearch', 'creation', 'edition']}
    ],
}

const world_populations = {
    number: [
        {table: 'worldPopulation', primaryEntity: "population", context: ['creation', 'edition']},
    ],
    text: [
        {table: 'worldPopulation', primaryEntity: "year", finalEntity: "year", context: ['creation']},
    ],

}

export {animals, world_populations, tableList, needIdTable}

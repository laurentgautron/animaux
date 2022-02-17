const tableList = ['animal', 'worldPopulation']

const tableApi = {animal: 'animals', worldPopulation: 'world_populations'}

const needIdTable = ['worldPopulation']

const animal = {
    text: [{table: 'animals', primaryEntity: "animalName", context: ['simpleResearch', 'fullResearch', 'creation', 'edition']}],
    textarea: [{table: 'animals', primaryEntity: "description", context: ['fullResearch', 'creation', 'edition']}],
    select: [{table: 'diets', primaryEntity: 'diet', context: ['fullResearch', 'creation', 'edition']},
        {table: 'species', primaryEntity: 'species', context: ['fullResearch', 'creation', 'edition']},
        {table: 'continents', primaryEntity: 'continents', multiple: true, context: ['fullResearch', 'creation', 'edition']}
    ],
    //array: [{table: 'worldPopulation', primaryEntity: 'worldPopulation'}]
}

const worldPopulation = {
    number: [
        {table: 'worldPopulation', primaryEntity: "population", context: ['creation', 'edition']},
    ],
    text: [
        {table: 'worldPopulation', primaryEntity: "year", finalEntity: "year", context: ['creation']},
    ],

}

export {animal, worldPopulation, tableList, tableApi, needIdTable}

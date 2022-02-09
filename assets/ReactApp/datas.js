const Animal = {
    text: [{table: 'animals', primaryEntity: "animalName", context: ['fullResearch', 'creation', 'edition']}],
    textarea: [{table: 'animals', primaryEntity: "description", context: ['creation', 'edition']}],
    select: [
        {table: 'diets', primaryEntity: 'diet', context: ['fullResearch', 'creation', 'edition']},
        {table: 'species', primaryEntity: 'species', context: ['fullResearch', 'creation', 'edition']},
        {table: 'continents', primaryEntity: 'continents', multiple: true, context: ['fullResearch', 'creation', 'edition']}
    ],
    array: [{table: 'worldPopulation', primaryEntity: 'worldPopulation'}]
}

const WorldPopulation = {
    text: [
        {table: 'worldPopulation', primaryEntity: "year", finalEntity: "year", context: ['creation', 'edition']},
        {table: 'worldPopulation', primaryEntity: "population", finalEntity: "population", context: ['creation', 'edition']},
    ],

}

export {Animal, WorldPopulation}

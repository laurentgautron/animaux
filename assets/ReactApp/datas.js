const inputFields = {
    text: [{table: 'animals', primaryEntity: "animal", finalEntity: "animalName", context: ['fullResearch', 'creation', 'edition', 'simpleResearch']}],
    select: [
        {table: 'diets', primaryEntity: 'diets', finalEntity: 'dietName', context: ['fullResearch', 'creation', 'edition']},
        {table: 'species', primaryEntity: 'species', finalEntity: 'speciesName', context: ['fullResearch', 'creation', 'edition']},
        {table: 'continents', primaryEntity: 'continents', finalEntity: 'continentsName', context: ['fullResearch', 'creation', 'edition']}
    ]
}

const tables = ["diets", "species", "continents"]

export {tables, inputFields}
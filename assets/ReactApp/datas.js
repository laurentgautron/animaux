const inputFields = {
    text: [{table: 'animals', primaryEntity: "animalName", finalEntity: "animalName", context: ['fullResearch', 'creation', 'edition', 'simpleResearch']}],
    textarea: [{table: 'animals', primaryEntity: "description", finalEntity: "description", context: ['creation', 'edition', 'simpleResearch']}],
    select: [
        {table: 'diets', primaryEntity: 'diets', finalEntity: 'dietName', context: ['fullResearch', 'creation', 'edition']},
        {table: 'species', primaryEntity: 'species', finalEntity: 'speciesName', context: ['fullResearch', 'creation', 'edition']},
        {table: 'continents', primaryEntity: 'continents', finalEntity: 'continentsName', context: ['fullResearch', 'creation', 'edition']}
    ]
}

export {inputFields}

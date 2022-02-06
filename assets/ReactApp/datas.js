const inputFields = {
    text: [{table: 'animals', primaryEntity: "animalName", finalEntity: "animalName", context: ['fullResearch', 'creation', 'edition']}],
    textarea: [{table: 'animals', primaryEntity: "description", finalEntity: "description", context: ['creation', 'edition']}],
    select: [
        {table: 'diets', primaryEntity: 'diet', finalEntity: 'dietName', context: ['fullResearch', 'creation', 'edition']},
        {table: 'species', primaryEntity: 'species', finalEntity: 'speciesName', context: ['fullResearch', 'creation', 'edition']},
        {table: 'continents', primaryEntity: 'continents', finalEntity: 'continentName', multiple: true, context: ['fullResearch', 'creation', 'edition']}
    ]
}

export {inputFields}

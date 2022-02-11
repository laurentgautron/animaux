import { animal, worldPopulation, needIdTable } from "./datas"

function init(inputFields) {
    let initForm = {}
    for (const item in inputFields) {
        for (const field of inputFields[item]) {
            if (item === "number") {
                initForm[field["primaryEntity"]] = 0
            }else if (field['multiple']) {
                initForm[field['primaryEntity']]  = []
            } else {
                initForm[field['primaryEntity']]  = ''
            }
        }
    }
    return initForm
}

function initFunction (props) {
    let initForm = {}
    if (props.datas) {
        console.log('il y a des datas')
        for (const key in props.datas) {
            if (Array.isArray(props.datas[key])) {
                if (Array.isArray(props.datas[key][0])) {
                    let tab = []
                    for (const item of props.datas[key]) {
                        tab.push(item[1])
                    }
                    initForm[key] = tab
                } else {
                    initForm[key] = props.datas[key][1]
                }

            } else {
                initForm[key] = props.datas[key]
            }
        }
    } else {
        switch(props.field) {
            case 'animal':
                initForm = init(animal, "primaryEntity")
                break
            case 'worldPopulation':
                initForm = init(worldPopulation, "primaryEntity")
                break
        }
    }
    return initForm
}

const contextFields = (field) => {
    if (field === 'animal') {
        return animal
    } else {
        return worldPopulation
    }
}

function makeUrl(form) {
    let url = "api/animals?"
    for ( const key in form) {
        if (form[key] !== '' && key !== "text") {
            if ( key === 'diets') {
                url = url + 'diet=' + form[key]
            } else if (Array.isArray(form[key])) {
                for (const item of form[key]) {
                    url = url + key + '[]='+ item + "&"
                }
            } else {
                url = url + key + "=" + form[key] + "&"
            }
        }
    }
    return url.slice(0, -1)
}

const datasForRequest = (objectForm, context, field, props) => {
    let form = {...objectForm}
    delete form['visible']
    delete form['wantModify']
    delete form['wantDestruction']
    delete form['destructionSuccess']
    delete form['showPopulation']
    if (context ==="creation") {
       for (const key in form) {
           if (form[key] === "") {
               const {type, multiple} = getInfos(key, field)
                if (type === 'select' && !multiple) {
                   form[key] = null
               }
           }
       }
       if (needIdTable.includes(props.field)) {
           console.log(' je mets un id: ', props.id)
           form['animal'] = props.id
       }
    }
    return form
}

const getInfos = (key, tableFields) => {
    let multiple = false
    let type = ''
    for (const keyInput in tableFields) {
        for (const item of tableFields[keyInput]) {
            if (item['primaryEntity'] === key) {
                type = keyInput
                multiple = item['multiple'] !== undefined
            }
       }
    }
    return {type: type, multiple: multiple}
}

const validation = (field, resp) => {
    let theform = init(field, "primaryEntity")
    for (const item of resp.violations) {
        theform[item['propertyPath']] = item['message']
    }
    return theform
}

const prepareTable = (table) => {
    if (table[table.length-1] !== 's') {
        return table + 's'
    }
    return table
}

const prepareId = (id) => {
    if (typeof(id) === "number") {
        return 'api/animals/' + id
    }
    return id
}

export {makeUrl, 
        initFunction,
        init, 
        datasForRequest,
        validation,
        contextFields,
        prepareTable,
        prepareId}
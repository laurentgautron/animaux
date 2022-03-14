import { needIdTable } from "./datas"

function init(inputFields) {
    let initForm = {}
    for (const item in inputFields) {
        for (const field of inputFields[item]) {
            if (item === "number") {
                initForm[field["primaryEntity"]] = 0
            }
            else if (field['multiple']) {
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
       initForm = init(props.table)
    }
    return initForm
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

const prepareIdApi= (field, id) => {
    return 'api/'+ field + '/' + id
}

const datasForRequest = (objectForm, context, props) => {
    let form = {...objectForm}
    const formInit = init(props.fields)
    // to remove key we don't need in body for request
    for (const key in form) {
        console.log('dans le form: ', key, !(key in formInit))
        if (!(key in formInit)) {
            delete form[key]
        }
    }
    // to put null in select  and multiple field
    if (context === "creation" || context === "edition") {
        for (const key in form) {
            if (form[key] === "") {
                const {type, multiple} = getInfos(key, props.fields)
                if (type === 'select' && !multiple) {
                form[key] = null
                }
            } 
        }
        if (needIdTable.includes(props.table)) {
            form['animal'] = prepareIdApi('animals', props.id)
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
        prepareTable,
        prepareIdApi,
        prepareId}
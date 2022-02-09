import { Animal, WorldPopulation } from "./datas"

function init(inputFields) {
    let initForm = {}
    for (const item in inputFields) {
        for (const field of inputFields[item]) {
            if (field['multiple']) {
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
        switch(props.field) {
            case 'animalsFields':
                initForm = init(Animal, "primaryEntity")
                break
            case 'populationsFields':
                initForm = init(WorldPopulation, "primaryEntity")
                break
        }
    }
    return initForm
}

const contextFields = (field) => {
    if (field === 'animalsFields') {
        return Animal
    } else {
        return WorldPopulation
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

const createNewAnimal = async (form) => {
    const response = await fetch('/api/animals', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/ld+json'
        },
        body: JSON.stringify(datasForRequest(form))
    })
    if (response.ok) {
        return true
    } else {
        return false
    }
}

const datasForRequest = (objectForm, context) => {
    delete objectForm['visible']
    delete objectForm['wantModify']
    delete objectForm['wantDestruction']
    delete objectForm['destructionSuccess']
    delete objectForm['showPopulation']
    if (context ==="creation") {
       for (const key in objectForm) {
           if (objectForm[key] === "") {
               const {type, multiple} = getInfos(key)
                if (type === 'select' && !multiple) {
                   objectForm[key] = null
               }
           }
       }
    }
    return objectForm
}

const getInfos = (key) => {
    let multiple = false
    let type = ''
    for (const keyInput in animalsFields) {
        for (const item of animalsFields[keyInput]) {
            if (item['primaryEntity'] === key) {
                type = keyInput
                multiple = item['multiple'] !== undefined
            }
       }
    }
    return {type: type, multiple: multiple}
}

const validation = (resp) => {
    let theform = init(animalsFields, "primaryEntity")
    for (const item of resp.violations) {
        theform[item['propertyPath']] = item['message']
    }
    console.log('les errors avant le return: ', theform)
    return theform
}

export {makeUrl, 
        initFunction,
        init, 
        createNewAnimal, 
        datasForRequest,
        validation,
        contextFields,}
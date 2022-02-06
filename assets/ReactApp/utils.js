import { inputFields } from "./datas"

function init(inputFields, entity) {
    let initForm = {}
    for (const item in inputFields) {
        for (const field of inputFields[item]) {
            initForm[field[entity]]  = ''
        }
    }
    return initForm
}

function initFunction (props) {

    let submitText = ""
    if (props.context === 'edition' || props.context === 'creation') {
        submitText = "enregistrer"
    } else {
        submitText = "rechercher"
    }

    let initForm = ""
    if (props.datas) {
        const form = {}
        for (const key in props.datas) {
            if (Array.isArray(props.datas[key])) {
                if (Array.isArray(props.datas[key][0])) {
                    let tab = []
                    for (const item of props.datas[key]) {
                        tab.push(item[1])
                    }
                    form[key] = tab
                } else {
                    form[key] = props.datas[key][1]
                }

            } else {
                form[key] = props.datas[key]
            }
        }
        initForm = form
    } else {
        initForm = init(inputFields, "primaryEntity")
        for ( const item in inputFields) {
            if (item === "select") {
                for (const selectItem of inputFields[item]) {
                    if (selectItem["multiple"]) {
                        initForm[selectItem.primaryEntity] = []
                    }
                }

            }
        }
    }

    return {submitText, initForm}
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

const datasForRequest = (objectForm) => {
    delete objectForm['visible']
    delete objectForm['wantModify']
    return objectForm
}



export {makeUrl, initFunction, init, createNewAnimal, datasForRequest}
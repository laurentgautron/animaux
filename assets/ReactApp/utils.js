import { inputFields } from "./datas"

export function init(inputFields, entity) {
    let initForm = {}
    for (const item in inputFields) {
        for (const field of inputFields[item]) {
            initForm[field[entity]]  = ''
        }
    }
    return initForm
}

export function initFunction (props) {

    let submitText = ""
    if (props.context === 'edition') {
        submitText = "enregistrer"
    } else {
        submitText = "rechercher"
    }

    let initForm = ""
    if (props.datas) {
        const form = {}
        for (const key in props.datas) {
            if (Array.isArray(props.datas[key])) {
                form[key] = props.datas[key][1]
            } else {
                form[key] = props.datas[key]
            }
        }
        initForm = form
    } else {
        console.log('je regarde')
        initForm = init(inputFields, "primaryEntity")
        for ( const item in inputFields) {
            console.log('dans la première boucle')
            if (item === "select") {
                console.log('dans le if: ', item)
                for (const selectItem of inputFields[item]) {
                    if (selectItem["multiple"]) {
                        console.log('un multiple: ', selectItem)
                        initForm[selectItem.primaryEntity] = []
                    }
                }

            }
        }
    }

    return {submitText, initForm}
}
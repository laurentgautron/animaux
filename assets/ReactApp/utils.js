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
    console.log('je construit la form')
    let submitText = ""
    if (props.context === 'edition' || props.context === 'creation') {
        submitText = "enregistrer"
    } else {
        submitText = "rechercher"
    }

    let initForm = ""
    if (props.datas) {
        console.log('des datas: ', props.datas)
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
    console.log('la form dans le init: ', initForm)
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

const datasForRequest = (objectForm, context) => {
    delete objectForm['visible']
    delete objectForm['wantModify']
    delete objectForm['wantDestruction']
    delete objectForm['destructionSuccess']
    if (context ==="creation") {
       // remplir les champs select avec null et contients avec tableau vide si la form est vide
       for (const key in objectForm) {
           if (objectForm[key] === "") {
               console.log('la clé est vide: ', key)
               const {type, multiple} = getInfos(key)
               console.log('les infos: ', type, ' et ', multiple)
               if (multiple) {
                   console.log('il y a un multiple: ', key)
                   objectForm[key] = []
               } else if (type === 'select') {
                   console.log('il y a un select: ', key)
                   objectForm[key] = null
               }
           }
       }
       console.log('la form pour la creation avant le body: ', objectForm)
    }
    return objectForm
}

const getInfos = (key) => {
    let multiple = false
    let type = ''
    for (const keyInput in inputFields) {
        for (const item of inputFields[keyInput]) {
            if (item['primaryEntity'] === key) {
                console.log('trouvé: ', item['primaryEntity'])
                type = keyInput
                multiple = item['multiple'] !== undefined
            }
           
       }
       console.log( 'les infos avant le return: ', type, 'et ', multiple)
    }
    return {type: type, multiple: multiple}
}

const validation = (resp) => {
    let form = init(inputFields, "primaryEntity")
    for (const item of resp.violations) {
        console.log('dans la boucle errors le item: ', item)
        console.log('le propertyPath: ', item['propertyPath'])
        form[item['propertyPath']] = item['message']
    }
    console.log('les errors avant le return: ', form)
    return form
}

export {makeUrl, 
        initFunction,
        init, 
        createNewAnimal, 
        datasForRequest,
        validation}
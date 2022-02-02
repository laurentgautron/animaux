export default function init(inputFields, entity) {
    let initForm = {}
    for (const item in inputFields) {
        for (const field of inputFields[item]) {
            initForm[field[entity]]  = ''
        }
    }
    return initForm
}
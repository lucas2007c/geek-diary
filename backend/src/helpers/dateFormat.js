const dateFormat = (obj) => {
    for (let field in obj) {
        if (field === 'start' || field === 'finish' || field === 'platinum') {
            const dateFormatted = obj[field].toLocaleString()
            obj[field] = dateFormatted

            //pesquisar metódo para retornar apenas a data, sem horário
        }
    }
    return obj
}
export default dateFormat
const dateFormat = (obj) => {
    for (let field in obj) {
        if (field === 'start' || field === 'finish' || field === 'platinum') {
            const dateFormatted = obj[field].toLocaleDateString()
            obj[field] = dateFormatted
        }
    }
    return obj
}
export default dateFormat
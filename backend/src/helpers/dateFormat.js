const dateFormat = (obj) => {
    for (let field in obj) {
        if (field === 'start' || field === 'finish' || field === 'platinum') {
            const date = obj[field].toISOString().split('T')[0].split('-')
            const dateFormatted = `${date[2]}/${date[1]}/${date[0]}`
            obj[field] = dateFormatted
        }
    }
    return obj
}
export default dateFormat
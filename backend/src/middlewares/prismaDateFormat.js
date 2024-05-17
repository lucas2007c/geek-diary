const prismaDateFormat = (req, res, next) => {
    const body = req.body
    for (let field in body) {
        if (field === 'start' || field === 'finish' || field === 'platinum') {
            if (body[field] !== null) {
                const date = body[field].split('/')
                const dateFormatted = `${date[2]}-${date[1]}-${date[0]}`
                const prismaDate = `${dateFormatted}T00:00:00.000Z`
                body[field] = prismaDate
            }
        }
    }
    next()
}
export default prismaDateFormat
const zodErrorFormat = (error) => {
    const errorFormatted = error.format()
    delete errorFormatted._errors
    for (let field in errorFormatted) {
        errorFormatted[field] = errorFormatted[field]._errors
    }
    return errorFormatted
}

export default zodErrorFormat
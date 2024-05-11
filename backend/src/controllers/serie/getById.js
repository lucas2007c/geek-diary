
const getById = async (req, res) => {
    try {
        res.json({ msg: `SERIES GET ID` })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }

}

export default getById
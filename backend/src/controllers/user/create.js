
const create = async (req, res) => {
    try {
        res.json({ msg: `CREATE` })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default create
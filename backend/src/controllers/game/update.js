
const update = async (req, res) => {
    try {
        res.json({ msg: `GAMES UPDATE` })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default update
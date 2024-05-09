
const listAll = async (req, res) => {
    try {
        res.json({ msg: `LIST ALL` })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default listAll
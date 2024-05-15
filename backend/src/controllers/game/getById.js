import gameModel from "../../models/gameModel.js"

const getById = async (req, res) => {
    try {
        const { id, userID } = req.params
        const game = await gameModel.getById(+id, +userID)

        if (!game) {
            return res.status(404).json({ msg: 'Jogo não encontrado' })
        }

        res.json({ msg: `Jogo ${id} listado com sucesso!`, game })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }

}

export default getById
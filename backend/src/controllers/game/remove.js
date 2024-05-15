import gameModel from "../../models/gameModel.js";
import dateFormat from "../../helpers/dateFormat.js";

const remove = async (req, res) => {
    try {
        const { id, userID } = req.params

        const gameFound = await gameModel.getById(+id, +userID)
        if (!gameFound) {
            return res.status(404).json({ msg: 'Jogo não encontrado' })
        }

        const game = await gameModel.remove(+id, +userID)

        res.json({ msg: `Jogo ${id} deletado com sucesso!`, game: dateFormat(game) })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }

}

export default remove
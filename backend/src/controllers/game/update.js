import gameModel from "../../models/gameModel.js";
import zodErrorFormat from "../../helpers/zodErrorFormat.js";

const update = async (req, res) => {
    try {
        const { id, userID } = req.params

        const gameFound = await gameModel.getById(+id, +userID)
        if (!gameFound) {
            return res.status(404).json({ msg: 'Jogo não encontrado' })
        }

        const data = req.body

        const result = gameModel.validateGameToCreate(data)
        if (!result.success) {
            return res.status(400).json({ error: 'Dados de atualização inválidos', fields: zodErrorFormat(result.error) })
        }

        const game = await gameModel.update(+id, +userID, data)
        res.json({ msg: `Jogo ${id} atualizado com sucesso!`, game: dateFormat(game) })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default update
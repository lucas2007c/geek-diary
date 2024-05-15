import gameModel from "../../models/gameModel.js";
import zodErrorFormat from "../../helpers/zodErrorFormat.js";

const create = async (req, res) => {
    try {
        const data = req.body

        const result = gameModel.validateGameToCreate(data)
        if (!result.success) {
            return res.status(400).json({ error: 'Dados de cadastro inválidos', fields: zodErrorFormat(result.error) })
        }

        const game = await gameModel.create(data)
        res.status(201).json({ msg: `Jogo cadastrado com sucesso!`, game })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default create
import gameModel from "../../models/gameModel.js";

const create = async (req, res) => {
    try {
        const data = req.body
        const game = await gameModel.create(data)
        res.status(201).json({ msg: `Jogo cadastrado com sucesso!`, game })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default create
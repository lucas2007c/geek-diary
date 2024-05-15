import gameModel from "../../models/gameModel.js";

const listAll = async (req, res) => {
    try {
        const games = await gameModel.getAll()
        return res.json({ msg: 'Jogos listados com sucesso!', games: dateFormatArray(games) })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default listAll
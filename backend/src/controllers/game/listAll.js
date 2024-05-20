import gameModel from "../../models/gameModel.js";
import dateFormatArray from '../../helpers/dateFormatArray.js'

const listAll = async (req, res) => {
    const { userID } = req.params
    try {
        const games = await gameModel.getAll(+userID)
        return res.json({ msg: 'Jogos listados com sucesso!', games: dateFormatArray(games) })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default listAll
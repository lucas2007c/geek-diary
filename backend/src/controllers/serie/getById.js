import dateFormat from "../../helpers/dateFormat.js"
import serieModel from "../../models/serieModel.js"

const getById = async (req, res) => {
    try {
        const { id, userID } = req.params
        const serie = await serieModel.getById(+id, +userID)

        if (!serie) {
            return res.status(404).json({ msg: 'Série não encontrada' })
        }

        res.json({ msg: `Série ${id} listada com sucesso!`, serie: dateFormat(serie) })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }

}

export default getById
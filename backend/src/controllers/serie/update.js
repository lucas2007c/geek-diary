import dateFormat from "../../helpers/dateFormat.js";
import serieModel from "../../models/serieModel.js";

const update = async (req, res) => {
    try {
        const { id, userID } = req.params

        const serieFound = await serieModel.getById(+id, +userID)
        if (!serieFound) {
            return res.status(404).json({ msg: 'Série não encontrada' })
        }

        const data = req.body

        const result = serieModel.validateSerieToUpdate(data)
        if (!result.success) {
            return res.status(400).json({ msg: 'Dados de atualização inválidos', fields: zodErrorFormat(result.error) })
        }

        const serie = await serieModel.update(+id, +userID, data)
        res.json({ msg: `Série ${id} atualizada com sucesso!`, serie: dateFormat(serie) })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default update
import serieModel from "../../models/serieModel.js";

const remove = async (req, res) => {
    try {
        const { id, userID } = req.params

        const serieFound = await serieModel.getById(+id, +userID)
        if (!serieFound) {
            return res.status(404).json({ msg: 'Série não encontrada' })
        }

        const serie = await serieModel.remove(+id, +userID)

        res.json({ msg: `Série ${id} deletada com sucesso!`, serie })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }

}

export default remove
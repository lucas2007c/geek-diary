import serieModel from "../../models/serieModel.js";
import zodErrorFormat from "../../helpers/zodErrorFormat.js";

const create = async (req, res) => {
    try {
        const data = req.body

        const result = serieModel.validateSerieToCreate(data)
        if (!result.success) {
            return res.status(400).json({ error: 'Dados de cadastro inválidos', fields: zodErrorFormat(result.error) })
        }

        const serie = await serieModel.create(data)
        res.status(201).json({ msg: `Série cadastrada com sucesso!`, serie })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default create
import serieModel from "../../models/serieModel.js";

const create = async (req, res) => {
    try {
        const data = req.body
        const serie = await serieModel.create(data)
        res.status(201).json({ msg: `Série cadastrada com sucesso!`, serie })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default create
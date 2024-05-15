import serieModel from "../../models/serieModel.js";

const listAll = async (req, res) => {
    try {
        const series = await serieModel.getAll()
        return res.json({ msg: 'Séries listadas com sucesso!', series })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default listAll
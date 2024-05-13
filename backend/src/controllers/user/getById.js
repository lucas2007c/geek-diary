import userModel from "../../models/userModel.js"

const getById = async (req, res) => {
    try {
        const { id } = req.params
        const user = await userModel.getById(+id)
        res.json({ msg: `Usuário ${id} listado com sucesso!`, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }

}

export default getById
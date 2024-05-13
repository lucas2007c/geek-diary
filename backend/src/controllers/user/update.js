import userModel from "../../models/userModel.js";

const update = async (req, res) => {
    try {
        const { id } = req.params
        const data = req.body
        const user = await userModel.update(+id, data)
        res.json({ msg: `Usuário ${id} atualizado com sucesso!`, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default update
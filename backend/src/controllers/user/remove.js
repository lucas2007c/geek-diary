import userModel from "../../models/userModel.js";

const remove = async (req, res) => {
    try {
        const { id } = req.params

        const userFound = await userModel.getById(+id)
        if (!userFound) {
            return res.status(404).json({ msg: 'Usuário não encontrado' })
        }

        const user = await userModel.remove(+id)

        res.json({ msg: `Usuário ${id} deletado com sucesso!`, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }

}

export default remove
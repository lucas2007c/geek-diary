import userModel from "../../models/userModel.js";
import zodErrorFormat from "../../helpers/zodErrorFormat.js";

const update = async (req, res) => {
    try {
        const { id } = req.params

        const userFound = await userModel.getById(+id)
        if (!userFound) {
            return res.status(404).json({ msg: 'Usuário não encontrado' })
        }

        const data = req.body

        const result = userModel.validateUserToUpdate(data)
        if (!result.success) {
            return res.status(400).json({ error: 'Dados de cadastro inválidos', fields: zodErrorFormat(result.error) })
        }

        const user = await userModel.update(+id, data)
        res.json({ msg: `Usuário ${id} atualizado com sucesso!`, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default update
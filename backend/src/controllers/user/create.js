import userModel from "../../models/userModel.js";
import zodErrorFormat from '../../helpers/zodErrorFormat.js'

const create = async (req, res) => {
    try {
        const data = req.body

        const result = userModel.validateUserToCreate(data)
        if (!result.success) {
            return res.status(400).json({ msg: 'Dados de cadastro inválidos', fields: zodErrorFormat(result.error) })
        }

        const user = await userModel.create(data)
        res.status(201).json({ msg: `Usuário criado com sucesso!`, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default create
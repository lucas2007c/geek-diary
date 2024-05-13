import userModel from "../../models/userModel.js";

const create = async (req, res) => {
    try {
        const data = req.body
        const user = await userModel.create(data)
        res.status(201).json({ msg: `Usuário criado com sucesso!`, user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Opsss erro no servidor, tente novamente!' })
    }
}

export default create
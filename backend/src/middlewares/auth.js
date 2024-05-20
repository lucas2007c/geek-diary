import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../config.js'

const auth = (req, res, next) => {
    //pegar o token
    let token = false
    token = req.cookies?.token
    token = req.headers?.authorization?.split(' ')[1]

    if (!token) {
        return res.status(401).json({
            msg: `Usuário não autenticado`
        })
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY)
        req.userLogged = { id, token }
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ msg: 'Token expirado.', code: 'expired-token' })
        }
        return res.status(401).json({ msg: 'Token Inválido.', code: 'invalid-token' })
    }
    next()
}

export default auth

// token expired eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IlJlbmFuIENhdmljaGkiLCJpYXQiOjE3MTQxNjEzMzgsImV4cCI6MTcxNDE2MTUxOH0.qnK6hktAjN8HSGwcXv6guLv4LxOdzzFr2xkd0I2UJ1E
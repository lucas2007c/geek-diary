import express from 'express'
import { PORT, HOST } from './config.js'
import logger from './middlewares/logger.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import userRouter from './routers/userRouter.js'
import gameRouter from './routers/gameRouter.js'
import serieRouter from './routers/serieRouter.js'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(logger)

//routers
app.use('/user', userRouter)
app.use('/game', gameRouter)
app.use('/serie', serieRouter)

app.listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`)
})
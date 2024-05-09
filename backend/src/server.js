import express from 'express'
import { PORT, HOST } from './config.js'
import logger from './middlewares/logger.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'

const app = express()

app.use(logger)
app.use(cookieParser())
app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))
app.use(express.json())

//routers

app.listen(PORT, () => {
    console.log(`Server running on ${HOST}:${PORT}`)
})
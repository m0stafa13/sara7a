import express from 'express'
import { env } from './config/config.service.js'
import { dbConnection } from './db/connection/connection.js'
import userRouter from './module/auth/auth.controller.js'
import { fileURLToPath } from 'node:url';
import path from 'path';
import { redisConnection } from './db/redis/connection.js';
const app = express()
app.use(express.json())
dbConnection()
export const client = await redisConnection()
// to get static files in uploads file 
const __filename = fileURLToPath(import.meta.url)
const __direname = path.dirname(__filename)
const uploadPath = path.resolve(__direname, "../uploads")
app.use("/uploads", express.static(uploadPath))

app.use("/auth", userRouter)
// global handle error 
app.use((error, req, res, next) => {
    let stack = env.mode == "prod" ? error.stack : null
    let status = error.cause ? error.cause.status : 500
    let extra = error.cause ? error.cause.extra : null
    res.status(status).json({
        message: error.message,
        stack, extra
    })
})


app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`)) 
import express from 'express'
import { env } from './config/config.service.js'
import { dbConnection } from './db/connection/connection.js'
import userRouter from './module/auth/auth.controller.js'
const app = express()



app.use(express.json())
dbConnection()
app.use("/auth", userRouter)

app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`)) 
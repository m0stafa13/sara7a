import express from 'express'
import { env } from './config/config.service.js'
import { dbConnection } from './db/connection/connection.js'
const app = express()



app.use(express.json())
dbConnection()

app.listen(env.port, () => console.log(`Example app listening on port ${env.port}!`))
import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) })
let port = process.env.PORT
let uri = process.env.URI
let salt = process.env.SALT_ROUND

export const env = {
    uri,
    port,
    salt
}

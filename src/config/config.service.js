import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) })
let port = process.env.PORT
let uri = process.env.URI

export const env = {
    uri,
    port
}

import dotenv from "dotenv"
import path from "path"

dotenv.config({ path: path.resolve(`./.env.${process.env.NODE_ENV}`) })
let port = process.env.PORT
let uri = process.env.URI
let salt = process.env.SALT_ROUND
let userSignature = process.env.USER_SIGNATURE
let adminSignature = process.env.ADMIN_SIGNATURE
let userRefreshSignature = process.env.USER_REFRESH_SIGNATURE
let adminRefreshSignature = process.env.ADMIN_REFRESH_SIGNATURE
let mode = process.env.MODE
export const env = {
    uri,
    port,
    salt,
    mode,
    userRefreshSignature,
    adminRefreshSignature,
    userSignature,
    adminSignature
}

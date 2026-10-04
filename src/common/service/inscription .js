import bcrypt from "bcrypt"
import { env } from "../../config/config.service.js"


export const hashPassword = async ({ planText, salt = env.salt }) => {
    let password = await bcrypt.hash(planText, Number(salt))
    return password
}

export const checkPassword = async (planText, dbPassword) => {
    let result = await bcrypt.compare(planText, dbPassword)
    return result
}
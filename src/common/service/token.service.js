// generate tokens
import jwt from "jsonwebtoken"
import { env } from "../../config/config.service.js"
export const generateToken = async (user) => {
    let signature
    let role
    let refreshSignature
    switch (user.role) {
        // admin case 
        case "1":
            signature = env.adminSignature
            refreshSignature = env.adminRefreshSignature
            role = "admin"
            break;
        // role is user 
        default:
            signature = env.userSignature
            refreshSignature = env.userRefreshSignature
            role = "user"
            break;
    }
    let accessToken = jwt.sign({ email: user.email, id: user._id }, signature, { audience: role, expiresIn: "30min" })
    let refreshToken = jwt.sign({ email: user.email, id: user._id }, refreshSignature, { audience: role, expiresIn: "1y" })
    return { accessToken, refreshToken }
}
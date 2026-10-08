// generate tokens
import jwt from "jsonwebtoken"
import { env } from "../../config/config.service.js"
import { BadRequestException } from "../exceptions/exceptions.js"
export const generateToken = async (user) => {
    if (!user) {
        return BadRequestException({ message: 'data require' })
    }
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
        case "0":
            signature = env.userSignature
            refreshSignature = env.userRefreshSignature
            role = "user"
            break;
        default:
            return BadRequestException({ message: "invalid audience" })
    }
    let accessToken = jwt.sign({ email: user.email, id: user._id }, signature, { audience: role, expiresIn: "30min" })
    let refreshToken = jwt.sign({ email: user.email, id: user._id }, refreshSignature, { audience: role, expiresIn: "1y" })
    return { accessToken, refreshToken }
}

// generate access token form refresh token 
export const generateAccessToken = (token) => {
    if (!token) {
        return BadRequestException({ message: 'invalid refresh token' })
    }
    let decodedToken = jwt.decode(token)
    if (!decodedToken) {
        return BadRequestException({ message: "invalid refresh token" })
    }
    let signature
    let refreshSignature
    let role
    switch (decodedToken.aud) {
        case "admin":
            signature = env.adminSignature
            refreshSignature = env.adminRefreshSignature
            role = user
            break;
        case "user":
            signature = env.userSignature
            refreshSignature = env.userRefreshSignature
            role = "user"
            break
        default:
            return BadRequestException({ message: "invalid audience" })
    }
    try {
        let decodedData = jwt.verify(token, refreshSignature)
        console.log(decodedData);
        let accessToken = jwt.sign({ id: decodedData.id, email: decodedData.email }, signature, { audience: role, expiresIn: "30min" })
        return {
            accessToken
        }
    } catch (error) {
        return BadRequestException({ message: "Invalid token" })
    }
}
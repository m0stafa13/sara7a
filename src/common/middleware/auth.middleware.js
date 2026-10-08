import jwt from "jsonwebtoken"
import { env } from "../../config/config.service.js";
import { BadRequestException } from "../exceptions/exceptions.js";
export const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return BadRequestException({ message: "token is required" })
    }
    let [flag, token] = req.headers.authorization.split(" ")
    switch (flag) {
        case "Basic":
            // not secure ==> hacker have user and password
            let [user, password] = Buffer.from(token, "base64").toString().split(":")
            console.log(user, password);
            next()
            break;
        case "Bearer":
            let decodedToken = jwt.decode(token)
            let signature
            if (!decodedToken) {
                return BadRequestException({ message: "token is not correct" })
            }
            switch (decodedToken.aud) {
                case "admin":
                    signature = env.adminSignature
                    break;
                case "user":
                    signature = env.userSignature
                    break
                default:
                    return BadRequestException({ message: "invalid audience" })
            }
            try {
                let accessToken = jwt.verify(token, signature)
                req.user = accessToken
                return next()
            } catch (error) {
                return BadRequestException({ message: "invalid token " })
            }
        default:
            return BadRequestException({ message: "Something went wrong" })
    }
}
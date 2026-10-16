import { userModel } from "../../db/model/user.model.js"
import { UnAuthorizeException } from "../exceptions/exceptions.js"


// check role 
export const checkRole = (role) => {
    return async (req, res, next) => {
        let { id } = req.user
        let user = await userModel.findById(id)
        if (!user.role.includes(role)) {
            return UnAuthorizeException({
                message: "You are not authorize to access this api"
            })
        }
        next()
    }
}
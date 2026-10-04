import { checkPassword, hashPassword } from "../../common/index.js"
import { userModel } from "../../db/model/user.model.js"

export const signUp = async (body) => {
    let { name, email, password, gender, age, confirmPassword } = body
    // check if password is match with confirm password
    if (password != confirmPassword) {
        return {
            message: "password is not match  with confirm password "
        }
    }
    // check if user name is already exist
    let checkUserEmail = await userModel.findOne({ email })
    if (checkUserEmail) {
        return {
            message: "user email is already exist"
        }
    }
    // hash password 
    let newPassword = await hashPassword({ planText: password })
    // add user to database
    let addUser = await userModel.create({ email, name, password: newPassword, gender, age })
    if (addUser) {
        return {
            message: "user added successfully",
            data: addUser
        }
    } else {
        return {
            message: "something went wrong"
        }
    }
}
// sign in 
export const signIn = async (body) => {
    let { email, password } = body
    // check email found or not 
    let checkEmail = await userModel.findOne({ email })
    if (!checkEmail) {
        return {
            message: "user email is not found"
        }
    }
    // compare passwords
    let passwordResult = await checkPassword(password, checkEmail.password)
    if (passwordResult) {
        return {
            message: "user login successfully",
            data: checkEmail
        }
    } else {
        return {
            message: "user password is not correct"
        }
    }
}
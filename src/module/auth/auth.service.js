import { BadRequestException, checkPassword, ConflictException, generateAccessToken, generateToken, hashPassword, NotFoundException } from "../../common/index.js"
import { sendEmail } from "../../common/service/sendEmail.service.js"
import { userModel } from "../../db/model/user.model.js"
// sign up 
export const signUp = async (body) => {
    let { name, email, password, gender, age } = body
    // check if user name is already exist
    let checkUserEmail = await userModel.findOne({ email })
    if (checkUserEmail) {
        return ConflictException({ message: "Email is already exists" })
    }
    // hash password 
    let newPassword = await hashPassword({ planText: password })
    // crate otp
    let otp = Math.round(Math.random() * 1000000)
    // call send email function 
    sendEmail({ to: email, message: otp, subject: "OTP to verify sara7a account" })
    // add user to database
    let addUser = await userModel.create({ email, name, password: newPassword, gender, age, otp })
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
        return NotFoundException({ message: "User email is not found" })
    }
    // compare passwords
    let passwordResult = await checkPassword(password, checkEmail.password)
    if (passwordResult) {
        // create token 
        let { accessToken, refreshToken } = await generateToken(checkEmail)
        return {
            message: "user login successfully",
            token: accessToken,
            refreshToken
        }
    } else {
        return BadRequestException({ message: "Password is not correct" })
    }
}
// get user data by toke
export const getUserByIdToken = async (data) => {
    let { id } = data
    let findUser = await userModel.findById(id)
    if (findUser) {
        return {
            message: "user founded successfully",
            user: findUser
        }
    } else {
        return NotFoundException({ message: "user not found" })
    }
}
//generate access token from refreshToken 
export const generateAccessTokenFromRefreshToken = async (refresh) => {
    let { refreshToken } = refresh
    let { accessToken } = generateAccessToken(refreshToken)
    if (accessToken) {
        return {
            message: "access token created successfully",
            token: accessToken
        }
    } else {
        return BadRequestException({ message: "invalid token" })
    }

}
// api to verify account
export const verifyAccount = async (data) => {
    let { email, otp } = data
    let findUser = await userModel.findOne({ email })
    if (findUser) {
        if (findUser.isVerified) {
            return BadRequestException({ message: "User account already verified" })
        } else if (findUser.otp == otp) {
            findUser.isVerified = true
            findUser.otp = null
            await findUser.save()
            return {
                message: "account verified successfully",
                user: findUser
            }
        } else {
            return BadRequestException({ message: "Otp is not correct" })
        }
    } else {
        return NotFoundException({ message: "user email not found" })
    }
}
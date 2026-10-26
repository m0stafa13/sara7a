import { BadRequestException, checkPassword, ConflictException, generateAccessToken, generateToken, hashPassword, NotFoundException } from "../../common/index.js"
import { sendEmail } from "../../common/service/sendEmail.service.js"
import { userModel } from "../../db/model/user.model.js"
import { get, set } from "../../db/redis/index.js";
// sign up 
export const signUp = async (body, file) => {
    let profileImage;
    if (file) {
        profileImage = file.path
    }
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
    let addUser = await userModel.create({ email, name, password: newPassword, gender, age, profileImage })
    await set(`otp::${addUser._id}`, otp, 200)
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
    if (!checkEmail.isVerified) {
        return BadRequestException({ message: "Account is not verified" })
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
        let redisOtp = await get(`otp::${findUser._id}`)
        console.log(redisOtp);

        if (findUser.isVerified) {
            return BadRequestException({ message: "User account already verified" })
        } else if (redisOtp == otp) {
            findUser.isVerified = true
            findUser.__v = findUser.__v + 1
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
// get all users 
export const getAllUsers = async () => {
    let users = await userModel.find()
    if (users.length > 0) {
        return {
            message: "users found successfully",
            users
        }
    }
    return {
        message: "no user founded"
    }
} 
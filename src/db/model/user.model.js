import mongoose from "mongoose"
import { genderEnum, providerEnum, roleEnum } from "../../common/index.js"
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        index: true,
        unique: true,
        lowercase: true
    }, password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: genderEnum,
        default: genderEnum.Mail
    },
    role: {
        type: String,
        enum: roleEnum,
        default: roleEnum.User
    }, isVerified: {
        type: Boolean,
        default: false
    }
    ,
    provider: {
        type: String,
        enum: providerEnum,
        default: providerEnum.System
    },
    profileImage: {
        type: String
    },
    coverImage: {
        type: [String]
    }

}, {
    timestamps: true,
})


export const userModel = mongoose.model("user", userSchema)

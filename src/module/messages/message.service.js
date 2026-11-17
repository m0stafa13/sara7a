import { NotFoundException } from "../../common/index.js"
import { messageModel, userModel } from "../../db/model/index.js"

export const getAllMessage = async () => {
    let data = await messageModel.find()
    if (!data.length > 0) {
        return NotFoundException({ message: "No message found" })
    }
    return data
}

// send message 
export const sendMessage = async (body, file) => {
    let { content, receiverId } = body
    let image;
    if (file) {
        image = file.path
    }
    // check if user found or not
    let checkReceiver = await userModel.findById(receiverId)
    if (!checkReceiver) {
        return NotFoundException({ message: "The receiver is not found" })
    }
    // sending message 
    let data = await messageModel.create({ receiverId, content, image })
    return data
}

// return user data using his uri
export const getUserData = async (uri) => {
    let { url } = uri
    let userName = url.split("/").at(-1)
    let data = await userModel.findOne({ uniqueName: userName })
    if (!data) {
        return NotFoundException({ message: "user not found" })
    }
    return data
}

// get user's message if found 
export const getUserMessage = async (user) => {
    let { id } = user
    let message = await messageModel.find({ receiverId: id })
    if (!message.length > 0) {
        return NotFoundException({ message: "no messages found " })
    }
    return message

}
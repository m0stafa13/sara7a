import { NotFoundException } from "../../common/index.js"
import { messageModel } from "../../db/model/index.js"

export const getAllMessage = async () => {
    let data = await messageModel.find()
    if (!data.length > 0) {
        return NotFoundException({ message: "No message found" })
    }
    return data
}
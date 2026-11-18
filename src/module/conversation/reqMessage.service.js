import { ConflictException, NotFoundException } from "../../common/exceptions/exceptions.js";
import { messageModel } from "../../db/model/message.model.js";
import { requestsModel } from "../../db/model/req.model.js";
import { userModel } from "../../db/model/user.model.js";

export const sendReq = async (body, user) => {
    let { messageId, receiverId } = body
    let { id } = user
    let checkMessage = await messageModel.findById(messageId)
    // check if message is found or not 
    if (!checkMessage) {
        return NotFoundException({ message: "message not found" })
    }
    // check if req is done or not 
    let checkReq = await requestsModel.findOne({ messageId })
    if (checkReq) {
        return ConflictException({ message: "this req is already done" })
    }
    // check receiver is found or not
    let checkReceiver = await userModel.findById(receiverId)
    if (!checkReceiver) {
        return NotFoundException({ message: "Receiver is not found " })
    }
    //create req 
    let data = await requestsModel.create({ messageId, senderId: id, receiverId })
    return data

}
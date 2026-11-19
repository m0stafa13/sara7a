import { messageStatusEnum } from "../../common/enum/message.enum.js";
import { BadRequestException, ConflictException, NotFoundException } from "../../common/exceptions/exceptions.js";
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



// get all requests
export const getAllReq = async (user) => {
    let { id } = user
    let getReq = await requestsModel.find({ _id: id })
    if (getReq.length > 0) {
        return getReq
    }
    return NotFoundException({ message: "No requests found" })
}
// accept or reject the req
export const acceptOrRejectReq = async (body, user) => {
    let { id } = user
    let { status, messageId, reqId } = body
    if (status != 0 && status != 1 && status != 2) {
        return BadRequestException({ message: "invalid data input" });
    }
    // check request
    let req = await requestsModel.findById(reqId)
    if (!req) {
        return NotFoundException({ message: "request is not found" })
    }
    // check message 
    let message = await messageModel.findById(messageId)
    if (!message) {
        return NotFoundException({ message: "Message is not found" })
    }
    let updateStatus = await requestsModel.findOneAndUpdate({ _id: reqId }, { status }, { returnDocument: "after" })
    let messageUp
    if (updateStatus.status == "1") {
        messageUp = true
    } else {
        messageUp = false
    }
    await messageModel.findOneAndUpdate({ _id: messageId }, { isAvailable: messageUp }, { returnDocument: "after" })
    return "Req is updated successfully"
}
//     REJECT: 0,
//     ACCEPT: 1,
//     PENDING: 2
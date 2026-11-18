import mongoose, { Types } from "mongoose";
import { messageStatusEnum } from "../../common/enum/message.enum.js";

const reqMessageSchema = new mongoose.Schema({
    senderId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    receiverId: {
        type: Types.ObjectId,
        required: true,
        ref: "user"
    },
    messageId: {
        type: Types.ObjectId,
        required: true,
        ref: "message"
    },
    status: {
        type: String,
        enum: messageStatusEnum,
        default: messageStatusEnum.PENDING
    }
}, {
    timestamps: true
})

export const requestsModel = mongoose.model("requests", reqMessageSchema)  
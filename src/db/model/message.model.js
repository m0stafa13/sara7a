import mongoose, { Types } from "mongoose"

const messageSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true,
    }, image: {
        type: String,
        required: false
    },
    receiverId: {
        type: Types.ObjectId,
        ref: "user",
        required: true
    },
    senderId: {
        type: Types.ObjectId,
        required: true
    },
    isAvailable: {
        type: Boolean,
        default: false
    }

}, {
    timestamps: true
})
export const messageModel = mongoose.model("message", messageSchema)
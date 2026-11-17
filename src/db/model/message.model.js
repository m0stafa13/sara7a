import mongoose, { Types } from "mongoose"

const messageSchema =  mongoose.Schema({
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
    }

}, {
    timestamps: true
})
export const messageModel = mongoose.model("message", messageSchema)
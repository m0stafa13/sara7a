import Router from "express"
import { getAllMessage, getUserData, getUserMessage, sendMessage } from "./message.service.js"
import { successResponse } from "../../common/exceptions/success.response.js"
import { auth, validator } from "../../common/index.js"
import { checkRole } from "../../common/service/checkRole.js"
import { upload } from "../../common/middleware/multer.js"
import { messageSchema } from "./message.validation.js"
const router = Router()

// get all message for admin 
router.get("/get-message", auth, checkRole("1"), async (req, res) => {
    let data = await getAllMessage()
    successResponse({
        res,
        data, 
    })
})
// send message 
router.post("/send-message", auth, upload().single("image"), validator(messageSchema),     async (req, res) => {
    let data = await sendMessage(req.body, req.file , req.user)
    successResponse({
        res, data, status: 201
    }) 
}
)
// get user data using his url 
router.get("/get-user", async (req, res) => {
    let data = await getUserData(req.query)
    successResponse({
        res, data, status: 200
    })
})

// get user's message
router.get("/user-message", auth, async (req, res) => {
    let data = await getUserMessage(req.user)
    successResponse({ res, data })
})


export default router
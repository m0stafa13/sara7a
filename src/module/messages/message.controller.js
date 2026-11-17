import Router from "express"
import { getAllMessage, sendMessage } from "./message.service.js"
import { successResponse } from "../../common/exceptions/success.response.js"
import { auth } from "../../common/index.js"
import { checkRole } from "../../common/service/checkRole.js"
import { upload } from "../../common/middleware/multer.js"
const router = Router()

// get all message for admin 
router.get("/get-message", auth, checkRole(["1"]), async (req, res) => {
    let data = await getAllMessage()
    successResponse({
        res,
        data,
    })
})
// send message 
router.post("/send-message", upload().single("image"), async (req, res) => {
    let data = await sendMessage(req.body, req.file)
    successResponse({
        res, data, status: 201
    })
}
)




export default router
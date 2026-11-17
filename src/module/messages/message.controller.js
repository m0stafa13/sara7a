import Router from "express"
import { getAllMessage } from "./message.service.js"
import { successResponse } from "../../common/exceptions/success.response.js"
import { auth } from "../../common/index.js"
import { checkRole } from "../../common/service/checkRole.js"
const router = Router()

// get all message for admin 
router.get("/get-message", auth, checkRole(["1"]), async (req, res) => {
    let data = await getAllMessage()
    successResponse({
        res,
        data,
    })
})





export default router
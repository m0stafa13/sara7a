import Router from "express"
import { auth } from "../../common/index.js"
import { sendReq } from "./reqMessage.service.js"
import { successResponse } from "../../common/exceptions/success.response.js"


const router = Router()

// create request 
router.post("/crate-req", auth, async (req, res) => {
    let data = await sendReq(req.body, req.user)
    successResponse({
        res, data, status: 201
    })
})

// get all req 
router.get("/get-all-req", auth, async (req, res) => {
    let data = await getAllReq(req.user)
    successResponse({
        res, data
    })
})

export default router



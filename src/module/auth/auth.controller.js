import { Router } from "express";
import { getUserByIdToken, signIn, signUp } from "./auth.service.js";
import { auth } from "../../common/index.js";
let router = Router()
// sign up 
router.post("/sign-up", async (req, res) => {
    let data = await signUp(req.body)
    res.json(data)
})
// sign in 
router.get("/sign-in", async (req, res) => {
    let data = await signIn(req.body)
    res.json(data)
})
// get user by id from token 
router.get("/get-user-by-id-token", auth, async (req, res) => {
    let data = await getUserByIdToken(req.user)
    res.json(data)
})




export default router
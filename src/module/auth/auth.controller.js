import { Router } from "express";
import { signIn, signUp } from "./auth.service.js";
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





export default router
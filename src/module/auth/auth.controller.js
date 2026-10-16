import { Router } from "express";
import { generateAccessTokenFromRefreshToken, getUserByIdToken, signIn, signUp } from "./auth.service.js";
import { auth, validator } from "../../common/index.js";
import { signUpSchema, singInSchema } from "./auth.validation.js";
let router = Router()
// sign up 
router.post("/sign-up", validator(singInSchema), async (req, res) => {

    let data = await signUp(req.data)
    res.json(data)
})
// sign in 
router.get("/sign-in", validator(signUpSchema), async (req, res) => {
    let data = await signIn(req.data)
    res.json(data)
})
// get user by id from token 
router.get("/get-user-by-id-token", auth, async (req, res) => {
    let data = await getUserByIdToken(req.user)
    res.json(data)
})
// get access from refresh token
router.get("/generate-access-token", async (req, res) => {
    let data = await generateAccessTokenFromRefreshToken(req.body)
    res.json(data)
})


export default router
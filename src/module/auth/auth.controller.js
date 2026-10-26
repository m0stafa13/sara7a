import { Router } from "express";
import { generateAccessTokenFromRefreshToken, getAllUsers, getUserByIdToken, signIn, signUp, verifyAccount } from "./auth.service.js";
import { auth, validator } from "../../common/index.js";
import { otpSchema, signUpSchema, singInSchema } from "./auth.validation.js";
import { checkRole } from "../../common/service/checkRole.js";
import { upload } from "../../common/middleware/multer.js";
let router = Router()
// sign up 
router.post("/sign-up", upload().single("image"), validator(singInSchema), async (req, res) => {
    let data = await signUp(req.data, req.file)
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
// verify account using otp 
router.put("/verify-account", validator(otpSchema), async (req, res) => {
    let data = await verifyAccount(req.data)
    res.json(data)
})
// get all users 
// checkRole is middleware to check authority 1 for admin , 0 form users
router.get("/get-all-users", auth, checkRole("1"), async (req, res) => {
    let data = await getAllUsers()
    res.json(data)
})


export default router





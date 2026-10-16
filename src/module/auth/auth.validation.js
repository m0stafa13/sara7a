import z from "zod"
// sign up schema 
export let signUpSchema = z.strictObject({
    email: z.email({ error: "Email is invalid" }),
    password: z.string({ error: "Password must be string" }).max(15).min(6)
})
// sign in schema 
export let singInSchema = signUpSchema.extend({
    name: z.string().includes(" ").min(3).max(30),
    age: z.number(),
    confirmPassword: z.string().max(15).min(6)
}).refine((val) => {
    return val.password == val.confirmPassword
}, {
    error: "Confirm password must match password"
})
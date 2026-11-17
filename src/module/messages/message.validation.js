// export let signUpSchema = z.strictObject({
//     email: z.email({ error: "Email is invalid" }),
//     password: z.string({ error: "Password must be string" }).max(15).min(6)
// })

import z from "zod";




export let messageSchema = z.object({
    content: z.string().min(3).max(500),
    receiverId: z.string().max(25).min(20)
})


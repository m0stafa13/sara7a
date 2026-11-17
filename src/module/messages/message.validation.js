import z from "zod";

export let messageSchema = z.object({
    content: z.string().min(3).max(500),
    receiverId: z.string().max(25).min(20)
})


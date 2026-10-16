import z from "zod"
import { BadRequestException } from "../exceptions/exceptions.js"
export const validator = (schema) => {
    return (req, res, next) => {
        let { data, success, error } = z.safeParse(schema, req.body)
        if (!success) {
            return BadRequestException({ message: "Invalid data input", extra: error.issues })
        }
        // to user only valid data in logic
        req.data = data
        next()
    }
}
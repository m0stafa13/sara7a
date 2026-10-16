import nodemailer from "nodemailer";
import { env } from "../../config/config.service.js";


let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: env.appEmail,
        pass: env.appPassword
    }
})


export const sendEmail = ({ to, message, subject = "From sara7a app" }) => {
    transporter.sendMail({
        from: "sara7a@gmail.com",
        to,
        html: `<h1>${message}</h1>`,
        subject
    })
}
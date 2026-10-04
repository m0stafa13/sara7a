import mongoose from "mongoose"
import { env } from "../../config/config.service.js";



export const dbConnection = async => {
    let uri = env.uri
    mongoose.connect(uri).then(() => {
        console.log("database connected successfully");
    }).catch((err) => {
        console.log("connection error", err);
    })
}
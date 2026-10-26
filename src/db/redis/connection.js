import { createClient } from "redis"
import { env } from "../../config/config.service.js";

export const redisConnection = async () => {
    const client = createClient({
        url: env.redisUri
    });
    client.on("error", function (err) {
        throw err;
    });
    await client.connect()
    console.log("redis connected successfully");
    return client
}  
const { createClient } = require("redis");

const redisClient = createClient({
    password: process.env.REDIS_PASSWORD,
    socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    },
});

async function connectRedis() {
    redisClient.on("error", (err) => console.error("Redis Client Error", err));
    await redisClient.connect();
    console.info("Redis Connected!");
}

module.exports = { redisClient, connectRedis };

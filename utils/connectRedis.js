const { createClient } = require("redis");

const redisClient = createClient({
    password: "91hx9x3NEtSGTdocfk5THPRV1ZtwaQjo",
    socket: {
        host: "redis-11387.c1.ap-southeast-1-1.ec2.redns.redis-cloud.com",
        port: 11387,
    },
});

async function connectRedis() {
    redisClient.on("error", (err) => console.log("Redis Client Error", err));
    await redisClient.connect();
    console.info("Redis Connected!");
}

module.exports = { redisClient, connectRedis };

const request = require("supertest");
const mongoose = require("mongoose");
const server = require("../index");
const User = require("../models/user.model");

const em = crypto.randomUUID().replaceAll("-", "");
const newTodo = {
    name: "test2",
    email: `${em}@test.test`,
    password: "test2",
};

describe("GET /", () => {
    it("should return server running message", async () => {
        const response = await request(server).get("/");
        expect(response.status).toBe(200);
        expect(response.text).toBe("teamwork-hub-server is running...");
    });
});

describe("GET /users", () => {
    beforeAll(async () => {
        if (mongoose.connection.readyState === 1) {
            console.log("Connected to MongoDB for testing");
        } else {
            await mongoose.connect("mongodb://localhost:27017/testdb", {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            await User.create({
                name: "test",
                email: "test@test.test",
                password: "test",
            });
        }
    });

    afterAll(async () => {
        await User.deleteMany();
        await mongoose.connection.close();
    });

    it("should get all users", async () => {
        const response = await request(server).get("/api/users/user");
        // expect(response.status).toBe(200);
        expect(response.body.length).toBe(1);
        expect(response.body[0].name).toBe("test");
    });

    it("should create a new user", async () => {
        const response = await request(server)
            .post("/api/users/register")
            .send(newTodo)
            .expect("Content-Type", /json/)
            .expect(201);
        // console.log({ response: response.body });

        expect(response.body.success).toBe(true);
    });

    it("should login", async () => {
        const response = await request(server)
            .post("/api/users/login")
            .send(newTodo)
            .expect("Content-Type", /json/)
            .expect(200);
        console.log({ response: response.body });

        expect(response.body.success).toBe(true);
    });
});

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectSocketIO = require("./socket");
const projectRoutes = require("./routes/projects.route");
const feedbacksRouter = require("./routes/feedbacks.route");
const documentsRouter = require("./routes/documents.route");
const connectDB = require("./utils/connectDB");
const userRouters = require("./routes/user.route");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authMiddleware = require("./middleware/authMiddleware");
const { getCurrentUser } = require("./controllers/user.controller");
const chatRouter = require("./routes/chat.route");
const { connectRedis, redisClient } = require("./utils/connectRedis");
const versionRouter = require("./routes/version.route");

connectDB();
connectRedis();

const PORT = process.env.PORT || 5000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
    cors({
        origin: [
            "http://localhost:4173",
            "http://localhost:5173",
            "https://teamwork-hub-client.vercel.app",
        ],
        credentials: true,
        optionSuccessStatus: 200,
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.status(200).send("teamwork-hub-server is running...");
});

app.use("/api/users", userRouters);
app.use("/api/projects", projectRoutes);
app.use("/api/feedbacks", feedbacksRouter);
app.use("/api/chats", chatRouter);
app.use("/api/documents", documentsRouter);
app.use("/api/versions", versionRouter);
app.get("/api/currentUser", authMiddleware, getCurrentUser);

const server = connectSocketIO(app);

server.listen(PORT, () => console.info(`Server running on port ${PORT}`));

module.exports = server;

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectSocketIO = require("./socket");
const projectRoutes = require("./routes/projects");
const feedbacksRouter = require("./routes/feedbacks");
const documentsRouter = require("./routes/documents");
const connectDB = require("./utils/connectDB");
const userRouters = require("./routes/user");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authMiddleware = require("./middleware/authMiddleware");
const { getCurrentUser } = require("./controllers/user.controller");

connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(
    cors({
        origin: ["http://localhost:5173"],
        credentials: true,
        optionSuccessStatus: 200,
    })
);
app.use(cookieParser());

app.get("/", (req, res) => {
    res.send("teamwork-hub-server is running...");
});

app.use("/api/users", userRouters);
app.use("/api/projects", projectRoutes);
app.use("/api/feedbacks", feedbacksRouter);
app.use("/api/documents", documentsRouter);
app.get("/api/currentUser", authMiddleware, getCurrentUser);

const server = connectSocketIO(app);

server.listen(PORT, () => console.info(`Server running on port ${PORT}`));

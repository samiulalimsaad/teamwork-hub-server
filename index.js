require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectSocketIO = require("./socket");
const projectRoutes = require("./routes/projects");
const feedbacksRouter = require("./routes/feedbacks");
const documentsRouter = require("./routes/documents");
const connectDB = require("./utils/connectDB");

connectDB();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("teamwork-hub-server is running...");
});

app.use("/api/projects", projectRoutes);
app.use("/api/feedbacks", feedbacksRouter);
app.use("/api/documents", documentsRouter);

const server = connectSocketIO(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

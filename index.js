require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const projectRoutes = require("./routes/projects");
const connectSocketIO = require("./socket");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;

app.use("/api/projects", projectRoutes);

const server = connectSocketIO(app);

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
    fetchUsers,
    fetchUserById,
    updateUser,
    deleteUser,
    logInUser,
    logOutUser,
    createUser,
} = require("../controllers/user.controller");

const userRouters = express.Router();

userRouters.get("/user", authMiddleware, fetchUsers);
userRouters.get("/user/:id", authMiddleware, fetchUserById);
userRouters.post("/register", createUser);
userRouters.put("/user/:id", authMiddleware, updateUser);
userRouters.delete("/user/:id", authMiddleware, deleteUser);
userRouters.post("/login", logInUser);
userRouters.post("/logout", authMiddleware, logOutUser);

module.exports = userRouters;

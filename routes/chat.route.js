const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getChats,
    getChatById,
    createChat,
    updateChat,
    deleteChat,
} = require("../controllers/chats.controller");

const chatRouter = express.Router();

chatRouter.get("/", authMiddleware, getChats);
chatRouter.get("/:id", authMiddleware, getChatById);
chatRouter.post("/", authMiddleware, createChat);
chatRouter.put("/:id", authMiddleware, updateChat);
chatRouter.delete("/:id", authMiddleware, deleteChat);

module.exports = chatRouter;

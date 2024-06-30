const Chat = require("../models/chat.model");

const getChats = async (req, res) => {
    try {
        const documentId = req.query.documentId;
        const chats = await Chat.find({
            document: documentId,
        }).populate("createdBy", "-password");
        res.json(chats);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getChatById = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.id);
        if (!chat) return res.status(404).json({ message: "Chat not found" });
        res.json(chat);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createChat = async (req, res) => {
    const { content, createdBy, document } = req.body;
    const newChat = new Chat({
        content,
        createdBy: req.user.id,
        document,
    });
    try {
        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateChat = async (req, res) => {
    try {
        const updatedChat = await Chat.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedChat);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteChat = async (req, res) => {
    try {
        await Chat.findByIdAndDelete(req.params.id);
        res.json({ message: "Chat deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getChats,
    getChatById,
    createChat,
    updateChat,
    deleteChat,
};

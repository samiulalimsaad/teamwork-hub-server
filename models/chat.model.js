const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
    {
        content: { type: String, required: true },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        document: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Document",
            required: true,
        },
    },
    { timestamps: true }
);

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;

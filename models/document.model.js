const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true, default: "untitled" },
        language: { type: String, required: true, default: "javascript" },
        theme: { type: String, required: true, default: "light" },
        content: { type: String, required: true, default: "" },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        project: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project",
            required: true,
        },
        feedbacks: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Feedback",
        },
    },
    { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;

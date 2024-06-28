const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
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
    },
    { timestamps: true }
);

const Document = mongoose.model("Document", documentSchema);

module.exports = Document;

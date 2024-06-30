const mongoose = require("mongoose");

const versionSchema = new mongoose.Schema(
    {
        documentId: { type: String, required: true },
        document: {
            title: { type: String, required: true, default: "untitled" },
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
    },
    { timestamps: true }
);

const Version = mongoose.model("Version", versionSchema);

module.exports = Version;

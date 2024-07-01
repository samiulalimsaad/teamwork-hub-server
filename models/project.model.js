const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        documents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Document" }],
        feedbacks: [{ type: mongoose.Schema.Types.ObjectId, ref: "Feedback" }],
    },
    { timestamps: true }
);

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;

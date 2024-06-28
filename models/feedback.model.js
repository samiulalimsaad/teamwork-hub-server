const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
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

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: String,
    timestamp: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", FeedbackSchema);
module.exports = {
    Feedback,
    FeedbackSchema,
};

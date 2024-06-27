const mongoose = require("mongoose");
const { FeedbackSchema } = require("./Feedback");

const DocumentSchema = new mongoose.Schema({
    title: String,
    content: String,
    lastUpdated: { type: Date, default: Date.now },
    feedback: [FeedbackSchema],
});

const Document = mongoose.model("Document", DocumentSchema);
module.exports = {
    Document,
    DocumentSchema,
};

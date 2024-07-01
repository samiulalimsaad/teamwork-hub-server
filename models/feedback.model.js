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

feedbackSchema.pre("save", async function (next) {
    try {
        if (this.isNew) {
            const Document = mongoose.model("Document");
            await Document.findByIdAndUpdate(this.document, {
                $push: { feedbacks: this._id },
            });
        }
        next();
    } catch (error) {
        next(error);
    }
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;

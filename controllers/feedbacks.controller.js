const Feedback = require("../models/feedback.model");

const getFeedbacks = async (req, res) => {
    try {
        const documentId = req.query.documentId;
        const feedbacks = await Feedback.find({
            document: documentId,
        }).populate("createdBy");
        res.json(feedbacks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getFeedbackById = async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback)
            return res.status(404).json({ message: "Feedback not found" });
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createFeedback = async (req, res) => {
    const { content, createdBy, document } = req.body;
    const newFeedback = new Feedback({
        content,
        createdBy: req.user.id,
        document,
    });
    try {
        const savedFeedback = await newFeedback.save();
        res.status(201).json(savedFeedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateFeedback = async (req, res) => {
    try {
        const updatedFeedback = await Feedback.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedFeedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteFeedback = async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: "Feedback deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
};

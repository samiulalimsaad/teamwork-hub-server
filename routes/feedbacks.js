const express = require("express");
const { Feedback } = require("../models/Feedback");

const feedbacksRouter = express.Router();

feedbacksRouter.get("/", async (req, res) => {
    try {
        const feedback = await Feedback.find();
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

feedbacksRouter.get("/:id", async (req, res) => {
    try {
        const feedback = await Feedback.findById(req.params.id);
        if (!feedback)
            return res.status(404).json({ message: "Feedback not found" });
        res.json(feedback);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

feedbacksRouter.post("/", async (req, res) => {
    const feedback = new Feedback(req.body);
    try {
        const savedFeedback = await feedback.save();
        res.status(201).json(savedFeedback);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

feedbacksRouter.put("/:id", async (req, res) => {
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
});

feedbacksRouter.delete("/:id", async (req, res) => {
    try {
        await Feedback.findByIdAndDelete(req.params.id);
        res.json({ message: "Feedback deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = feedbacksRouter;

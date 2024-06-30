const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
} = require("../controllers/feedbacks.controller");

const feedbackRouter = express.Router();

feedbackRouter.get("/", authMiddleware, getFeedbacks);
feedbackRouter.get("/:id", authMiddleware, getFeedbackById);
feedbackRouter.post("/", authMiddleware, createFeedback);
feedbackRouter.put("/:id", authMiddleware, updateFeedback);
feedbackRouter.delete("/:id", authMiddleware, deleteFeedback);

module.exports = feedbackRouter;

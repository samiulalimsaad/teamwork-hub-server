const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getFeedbacks,
    getFeedbackById,
    createFeedback,
    updateFeedback,
    deleteFeedback,
} = require("../controllers/feedbacks.controller");

const router = express.Router();

router.get("/", authMiddleware, getFeedbacks);
router.get("/:id", authMiddleware, getFeedbackById);
router.post("/", authMiddleware, createFeedback);
router.put("/:id", authMiddleware, updateFeedback);
router.delete("/:id", authMiddleware, deleteFeedback);

module.exports = router;

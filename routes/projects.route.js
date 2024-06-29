const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjects,
} = require("../controllers/projects.controller");

const router = express.Router();

router.get("/", authMiddleware, getProjects);
router.get("/:id", authMiddleware, getProjectById);
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

module.exports = router;

const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const {
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
    getProjects,
} = require("../controllers/projects.controller");

const projectRouter = express.Router();

projectRouter.get("/", authMiddleware, getProjects);
projectRouter.get("/:id", authMiddleware, getProjectById);
projectRouter.post("/", authMiddleware, createProject);
projectRouter.put("/:id", authMiddleware, updateProject);
projectRouter.delete("/:id", authMiddleware, deleteProject);

module.exports = projectRouter;

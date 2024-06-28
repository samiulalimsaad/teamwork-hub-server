const express = require("express");
const { Project } = require("../models/Project");
const { Feedback } = require("../models/Feedback");

const projectsRouter = express.Router();

projectsRouter.get("/", async (req, res) => {
    try {
        const projects = await Project.find();
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

projectsRouter.get("/:id", async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

projectsRouter.post("/", async (req, res) => {
    const project = new Project(req.body);
    try {
        const savedProject = await project.save();
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

projectsRouter.put("/:id", async (req, res) => {
    try {
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

projectsRouter.delete("/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.json({ message: "Project deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = projectsRouter;

const Project = require("../models/project.model");
const { redisClient } = require("../utils/connectRedis");

const getProjects = async (req, res) => {
    try {
        const data = await redisClient.get(req.user.email);
        console.info("_________from cached___________");

        if (data) return res.json(JSON.parse(data || "{}"));
        const projects = await Project.find().populate(
            "createdBy",
            "-password"
        );
        res.json(projects);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getProjectById = async (req, res) => {
    try {
        const project = await Project.findById(req.params.id).populate(
            "createdBy"
        );
        if (!project)
            return res.status(404).json({ message: "Project not found" });
        res.json(project);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createProject = async (req, res) => {
    const { title, description, createdBy } = req.body;
    const newProject = new Project({
        title,
        description,
        createdBy: req.user.id,
    });
    try {
        const savedProject = await newProject.save();
        const projects = await Project.find().populate(
            "createdBy",
            "-password"
        );
        await redisClient.set(req.user.email, JSON.stringify(projects));
        res.status(201).json(savedProject);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateProject = async (req, res) => {
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
};

const deleteProject = async (req, res) => {
    try {
        const projects = await Project.find().populate(
            "createdBy",
            "-password"
        );
        await Project.findByIdAndDelete(req.params.id);
        await redisClient.set(req.user.email, JSON.stringify(projects));
        res.json({ message: "Project deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getProjects,
    getProjectById,
    createProject,
    updateProject,
    deleteProject,
};

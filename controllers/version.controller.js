const Version = require("../models/Version.model");
const Project = require("../models/project.model");
const Version = require("../models/version.model");

const getVersions = async (req, res) => {
    try {
        const projectId = req.query.projectId;
        const versions = await Version.find();
        res.json(versions);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getVersionById = async (req, res) => {
    try {
        const version = await version.findById(req.params.id);
        if (!version)
            return res.status(404).json({ message: "Version not found" });
        res.json(version);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createVersion = async (req, res) => {
    const { title, content, project } = req.body;
    const newVersion = new Version({
        title,
        content,
        createdBy: req.user.id,
        project,
    });
    try {
        const savedVersion = await newVersion.save();
        res.status(201).json(savedVersion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateVersion = async (req, res) => {
    try {
        const updatedVersion = await Version.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedVersion);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteVersion = async (req, res) => {
    try {
        await Version.findByIdAndDelete(req.params.id);
        res.json({ message: "Version deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getVersions,
    getVersionById,
    createVersion,
    updateVersion,
    deleteVersion,
};

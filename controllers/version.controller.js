const Project = require("../models/project.model");
const Version = require("../models/version.model");
const Document = require("../models/document.model");

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
        const version = await Version.find({ documentId: req.params.id }).sort({
            createdAt: -1,
        });
        if (!version)
            return res.status(404).json({ message: "Version not found" });
        res.json(version);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createVersion = async (req, res) => {
    const { document } = req.body;

    const doc = await Document.findById(document);

    const newVersion = new Version({ document: doc, documentId: doc._id });
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

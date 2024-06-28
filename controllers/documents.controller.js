const Document = require("../models/document.model");

const getDocuments = async (req, res) => {
    try {
        const documents = await Document.find();
        res.json(documents);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getDocumentById = async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document)
            return res.status(404).json({ message: "Document not found" });
        res.json(document);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createDocument = async (req, res) => {
    const { title, content, createdBy, project } = req.body;
    const newDocument = new Document({
        title,
        content,
        createdBy,
        project,
    });
    try {
        const savedDocument = await newDocument.save();
        res.status(201).json(savedDocument);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const updateDocument = async (req, res) => {
    try {
        const updatedDocument = await Document.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedDocument);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

const deleteDocument = async (req, res) => {
    try {
        await Document.findByIdAndDelete(req.params.id);
        res.json({ message: "Document deleted" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
};

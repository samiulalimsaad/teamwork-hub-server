const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
    getDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
} = require("../controllers/documents.controller");

const documentRouter = express.Router();

documentRouter.get("/", authMiddleware, getDocuments);
documentRouter.get("/:id", authMiddleware, getDocumentById);
documentRouter.post("/", authMiddleware, createDocument);
documentRouter.put("/:id", authMiddleware, updateDocument);
documentRouter.delete("/:id", authMiddleware, deleteDocument);

module.exports = documentRouter;

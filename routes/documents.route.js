const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const {
    getDocuments,
    getDocumentById,
    createDocument,
    updateDocument,
    deleteDocument,
} = require("../controllers/documents.controller");

const router = express.Router();

router.get("/", authMiddleware, getDocuments);
router.get("/:id", authMiddleware, getDocumentById);
router.post("/", authMiddleware, createDocument);
router.put("/:id", authMiddleware, updateDocument);
router.delete("/:id", authMiddleware, deleteDocument);

module.exports = router;

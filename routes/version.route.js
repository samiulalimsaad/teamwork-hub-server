const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");

const {
    getVersions,
    getVersionById,
    createVersion,
    updateVersion,
    deleteVersion,
} = require("../controllers/version.controller");

const versionRouter = express.Router();

versionRouter.get("/", authMiddleware, getVersions);
versionRouter.get("/:id", authMiddleware, getVersionById);
versionRouter.post("/", authMiddleware, createVersion);
versionRouter.put("/:id", authMiddleware, updateVersion);
versionRouter.delete("/:id", authMiddleware, deleteVersion);

module.exports = versionRouter;

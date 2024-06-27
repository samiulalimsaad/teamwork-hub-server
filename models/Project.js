const mongoose = require("mongoose");
const { DocumentSchema } = require("./Document");

const ProjectSchema = new mongoose.Schema({
    title: String,
    description: String,
    documents: [DocumentSchema],
});

const Project = mongoose.model("Project", ProjectSchema);
module.exports = {
    Project,
    ProjectSchema,
};

const mongoose = require('../services/mongoose.service').mongoose;
const uuid = require('uuid');
const Schema = mongoose.Schema;
const Sprint = require('../models/sprints.model');

/**
 * @type {mongoose.Schema}
 *
 * @swagger
 * definitions:
 *  Project:
 *      type: "object"
 *      properties:
 *          _id:
 *              type: "string"
 *          name:
 *              type: "string"
 *          description:
 *              type: "string"
 *          startDate:
 *              type: "string"
 *          endDate:
 *              type: "string"
 *      example:
 *          name: "Test project"
 *          description: "This is a test project"
 *          startDate: '2002-12-09'
 *          endDate: '2002-12-09'
 *
 */
const projectSchema = new Schema({
    _id: { type: String, default: uuid.v4},
    name: String,
    description: String,
    sprints: [Sprint.sprintSchema()],
    team: [{type: String, required: true, ref: 'Users'}],
    startDate: Date,
    endDate: Date
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Project = mongoose.model('Projects', projectSchema);

exports.projectSchema = () => {
    return projectSchema;
};

exports.projectModel = () => {
    return Project;
};

const mongoose = require('../services/mongoose.service').mongoose;
const uuid = require('uuid');
const Schema = mongoose.Schema;
const Task = require('../models/tasks.model');

/**
 * @type {mongoose.Schema}
 *
 * @swagger
 * definitions:
 *  Sprint:
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
 */
const sprintSchema = new Schema({
    _id: { type: String, default: uuid.v4},
    name: String,
    description: String,
    tasks: [Task.taskSchema()],
    startDate: Date,
    endDate: Date
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Sprint = mongoose.model('Sprints', sprintSchema);

exports.sprintSchema = () => {
    return sprintSchema;
};

exports.sprintModel = () => {
    return Sprint;
};
const mongoose = require('../services/mongoose.service').mongoose;
const uuid = require('uuid');
const Schema = mongoose.Schema;

/**
 * @type {mongoose.Schema}
 *
 * @swagger
 * definitions:
 *  Task:
 *      type: "object"
 *      properties:
 *          _id:
 *              type: "string"
 *          name:
 *              type: "string"
 *          description:
 *              type: "string"
 *          status:
 *              type: "string"
 *          grade:
 *              type: "integer"
 *          assignedTo:
 *              type: "string"
 *          startDate:
 *              type: "string"
 *          endDate:
 *              type: "string"
 */
const taskSchema = new Schema({
    _id: { type: String, default: uuid.v4},
    name: String,
    description: String,
    assignedTo: {type: String, ref: 'Users'},
    status: String,
    grade: Number,
    startDate: Date,
    endDate: Date
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

const Task = mongoose.model('Tasks', taskSchema);

exports.taskSchema = () => {
    return taskSchema;
};

exports.taskModel = () => {
    return Task;
};
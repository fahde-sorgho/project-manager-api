const Joi = require('@hapi/joi');
const sprintService = require('./sprints.service');
const Task = require('../models/tasks.model').taskModel();
const userService = require('../services/users.service');

const schemaValidator = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description:  Joi.string().min(10).required(),
    status: Joi.string().valid('todo','doing','finished').required(),
    grade: Joi.number(),
    startDate: Joi.date(),
    endDate: Joi.date(),
});

exports.create = async (projectId, sprintId, taskData) => {
    const result = schemaValidator.validate(taskData,  {abortEarly: false});
    if(result.error) {
        return result;
    }

    let sprint = await sprintService.findByID(projectId, sprintId);
    const task = new Task(taskData);
    sprint.tasks.push(task);
    await sprint.parent().save();
    return task;
};

exports.list = async (projectId, sprintId, perPage, page) => {
    let sprint = await sprintService.findByID(projectId, sprintId);
    return sprint.tasks;
};

exports.findByID = async (projectId, sprintId, taskId) => {
    let sprint = await sprintService.findByID(projectId, sprintId);
    return sprint.tasks.id(taskId);
};

exports.putByID = async (projectId, sprintId, taskId, taskData) => {
    let sprint = await sprintService.findByID(projectId, sprintId);

    sprint.tasks.id(taskId).name = taskData.name;
    sprint.tasks.id(taskId).description = taskData.description;
    sprint.tasks.id(taskId).assignedTo = taskData.assignedTo;
    sprint.tasks.id(taskId).status = taskData.status;
    sprint.tasks.id(taskId).grade = taskData.grade;
    sprint.tasks.id(taskId).startDate = taskData.startDate;
    sprint.tasks.id(taskId).endDate = taskData.endDate;

    let task = sprint.tasks.id(taskId).toJSON();
    delete task._id;
    delete task.created_at;
    delete task.updated_at;

    let valid = schemaValidator.validate(task,  {abortEarly: false});
    if(valid.error) {
        return valid;
    }

    await sprint.parent().save();

    return (sprint.tasks.id(taskId));
};

exports.patchByID = async (projectId, sprintId, taskId, taskData) => {
    let sprint = await sprintService.findByID(projectId, sprintId);

    for (let i in taskData) {
        sprint.tasks.id(taskId)[i] = taskData[i];
    }

    let task = sprint.tasks.id(taskId).toJSON();
    delete task._id;
    delete task.created_at;
    delete task.updated_at;

    let valid = schemaValidator.validate(task,  {abortEarly: false});
    if(valid.error) {
        return valid;
    }

    await sprint.parent().save();

    return (sprint.tasks.id(taskId));
};

exports.removeByID = async (projectId, sprintId, taskId) => {
    let sprint = await sprintService.findByID(projectId, sprintId);
    sprint.tasks.id(taskId).remove();
    await sprint.parent().save();
};

exports.putUser = async (projectId, sprintId, taskId, userId) => {
    try {
        let id = null;
        let sprint = await sprintService.findByID(projectId, sprintId);

        if(userId) {
            await userService.findById(userId);
            id = userId;
        }

        sprint.tasks.id(taskId). assignedTo = id;

        await sprint.parent().save();
        return (sprint.tasks.id(taskId));
    } catch (e) {
        throw "User not found"
    }
};
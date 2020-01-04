const Joi = require('@hapi/joi');
const projectService = require('../services/projects.service');
const Sprint = require('../models/sprints.model').sprintModel();

const schemaValidator = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description:  Joi.string().min(10).required(),
    startDate: Joi.date(),
    endDate: Joi.date(),
});

exports.create = async (id, sprintData) => {
    const result = schemaValidator.validate(sprintData, {abortEarly: false});
    if(result.error) {
        return result;
    }

    let project = await projectService.findById(id);
    let sprint = new Sprint(sprintData);
    project.sprints.push(sprint);
    await project.save();
    return (sprint);

};

exports.list = async (id, perPage, page) => {
    let project = await projectService.findById(id);
    return project.sprints;
};

exports.findByID = async (projectId, sprintId) => {
    let project = await projectService.findById(projectId);
    return project.sprints.id(sprintId);
};

exports.putByID = async (projectId, sprintId, sprintData) => {
    let project = await projectService.findById(projectId);

    project.sprints.id(sprintId).name = sprintData.name;
    project.sprints.id(sprintId).description = sprintData.description;
    project.sprints.id(sprintId).startDate = sprintData.startDate;
    project.sprints.id(sprintId).endDate = sprintData.endDate;

    let sprint = project.sprints.id(sprintId).toJSON();
    delete sprint._id;
    delete sprint.tasks;
    delete sprint.created_at;
    delete sprint.updated_at;

    let valid = schemaValidator.validate(sprint, {abortEarly: false});
    if(valid.error) {
        return valid;
    }

    await project.save();
    return (project.sprints.id(sprintId));
};

exports.patchByID = async (projectId, sprintId, sprintData) => {
    let project = await projectService.findById(projectId);

    for (let i in sprintData) {
        project.sprints.id(sprintId)[i] = sprintData[i];
    }
    let sprint = project.sprints.id(sprintId).toJSON();
    delete sprint._id;
    delete sprint.tasks;
    delete sprint.created_at;
    delete sprint.updated_at;

    let valid = schemaValidator.validate(sprint,  {abortEarly: false});
    if(valid.error) {
        return valid;
    }

    await project.save();
    return (project.sprints.id(sprintId));
};

exports.removeByID = async (projectId, sprintId) => {
    let project = await projectService.findById(projectId);

    project.sprints.id(sprintId).remove();
    await project.save();
    return ('Done');
};
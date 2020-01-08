const Joi = require('@hapi/joi');
const Project = require('../models/projects.model').projectModel();
const userService = require('../services/users.service');

const schemaValidator = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    description:  Joi.string().min(10).required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().greater(Joi.ref('startDate')).required(),
});

exports.createProject = async (projectData) => {
    const result = schemaValidator.validate(projectData);
    if(result.error) {
        return result;
    }

    const project = new Project(projectData);
    await project.save();

    return project;
};

exports.findById = async (id) => {
    return await checkProject(id);
};

exports.list = async (perPage, page) => {
    return await Project.find()
       .limit(perPage)
       .skip(perPage * page)
       .exec();
};

exports.putById = async (id, projectData) => {

    let project = await checkProject(id);

    project.name = projectData.name;
    project.description = projectData.description;
    project.startDate = projectData.startDate;
    project.endDate = projectData.endDate;

    let validation = project.toJSON();
    delete validation._id;
    delete validation.created_at;
    delete validation.updated_at;
    delete validation.sprints;
    delete validation.team;
    delete validation._v;
    delete validation.__v;

    let valid = schemaValidator.validate(validation, {abortEarly: false});
    if(valid.error) {
        return valid;
    }
    await project.save();

    return project;
};

exports.patchById = async (id, projectData) => {
    let project = await checkProject(id);

    for (let i in projectData) {
        project[i] = projectData[i];
    }

    let validation = project.toJSON();
    delete validation._id;
    delete validation.created_at;
    delete validation.updated_at;
    delete validation.sprints;
    delete validation.team;
    delete validation._v;
    delete validation.__v;

    let valid = schemaValidator.validate(validation, {abortEarly: false});
    if(valid.error) {
        return valid;
    }

    await project.save();

    return project;
};

exports.removeById = async (id) => {
    await checkProject(id);

    return await Project.deleteOne({_id: id});
};

exports.addInTeam = async (id, userId) => {
    try {
        await userService.findById(userId);
        let project = await checkProjectWOPopulate(id);

        if (!project.team.includes(userId)) {
            project.team.push(userId);
            await project.save();
            return project;
        }

        return "exist";
    } catch (e) {
        throw "User not found"
    }
};

exports.removeFromTeam = async (id, userId) => {
    let project = await checkProjectWOPopulate(id);
    if (!project.team.includes(userId))
        throw "This user is not in the project";

    project.team.splice(project.team.indexOf(userId),1);
    await project.save();

    return project;
};

async function checkProject(id) {
    let project = await Project.findOne({_id: id})
        .populate('team', '-password -_v -__v -permissionLevel')
        .populate('sprints.tasks.assignedTo', '-password -_v -__v -permissionLevel');

    if (!project)
        throw "Project not found";

    return project;
}

async function checkProjectWOPopulate(id) {
    let project = await Project.findOne({_id: id});

    if (!project)
        throw "Project not found";

    return project;
}
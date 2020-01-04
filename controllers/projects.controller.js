const projectService = require('../services/projects.service');

exports.insert = async (req, res) => {
    try {
       let result = await projectService.createProject(req.body);
       if (result.error) {
            res.status(422).send({error: result.error.details});
            return;
       }
       res.status(201).send({id: result._id});
    } catch (e) {
        res.status(422).send({error: e});
    }
};

exports.getById = async (req, res) => {
    try {
        let project =await projectService.findById(req.params.id);
        res.status(200).send(project);
    } catch (e) {
        res.status(404).json({error: "Project not found"});
    }
};

exports.list =async (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 20;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }


    let list = await projectService.list(limit, page);
    res.status(200).send(list);
};

exports.putById = async (req, res) => {
    try {
        let project = await projectService.putById(req.params.id, req.body);

        if (project.error)
        {
            res.status(422).send({error: project.error.details});
            return ;
        }
        res.status(200).send(project);

    } catch (e) {
        res.status(404).send({error: 'Project not found'});
    }
};

exports.patchById = async (req, res) => {
    try {
        let project = await projectService.patchById(req.params.id, req.body);

        if (project.error)
        {
            res.status(422).send({error: project.error.details});
            return ;
        }
        res.status(200).send(project);

    } catch (e) {
        res.status(404).send({error: 'Project not found'});
    }
};

exports.removeById = async (req, res) => {
    try {
        await projectService.removeById(req.params.id);
        res.status(204).send({});
    } catch (e) {
        res.status(404).send({error: 'Project not found'});
    }
};

exports.addInTeam = async (req, res) => {
    try {
        let result = await projectService.addInTeam(req.params.id, req.body.userId);
        if (result !== "exist") {
            res.status(201).send({});
            return;
        }
        res.status(400).send({message: "User already in the project"});
    } catch (e) {
        res.status(404).send({error: e});
    }
};

exports.removeFromTeam = async (req, res) => {
    try {
        await projectService.removeFromTeam(req.params.id, req.params.userId);
        res.status(204).send({});
    } catch (e) {
        res.status(404).send({error: e});
    }
};
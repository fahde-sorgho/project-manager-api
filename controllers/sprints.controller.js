let projectService = require('../services/projects.service');
let sprintService = require('../services/sprints.service');

exports.insert = async (req, res) => {
    try {
        await checkProject(req.params.projectId);
        let result = await sprintService.create(req.params.projectId, req.body);

        if (result.error) {
            res.status(422).send({error: result.error.details});
            return;
        }
        res.status(201).send({id: result._id});
    } catch (e) {
        res.status(404).json({error: e});
    }
};

exports.list = async (req, res) => {
    let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 20;
    let page = 0;
    if (req.query) {
        if (req.query.page) {
            req.query.page = parseInt(req.query.page);
            page = Number.isInteger(req.query.page) ? req.query.page : 0;
        }
    }

    let list = await sprintService.list(req.params.projectId, limit, page)
    res.status(200).send(list);
};

exports.findById = async (req, res) => {
    try {
        await checkProject(req.params.projectId);
        let result = await sprintService
                .findByID(req.params.projectId, req.params.sprintId);

        if (!result) {
            res.status(404).json({error: "Sprint not found"});
            return;
        }
        res.status(200).send(result);

    } catch (e) {
        res.status(404).json({error: e.toString()});
    }
};

exports.putById = async (req, res) => {
    try {
        await checkProject(req.params.projectId);
        let result = await sprintService
            .findByID(req.params.projectId, req.params.sprintId);
        if (!result) {
            res.status(404).json({error: "Sprint not found"});
            return;
        }

        let updateSprint = await sprintService
            .patchByID(req.params.projectId, req.params.sprintId, req.body);

        if (updateSprint.error)
        {
            res.status(422).send({error: updateSprint.error.details});
            return ;
        }

        res.status(200).send(updateSprint);

    } catch (e) {
        res.status(404).json({error: e.toString()});
    }
};

exports.patchById = async (req, res) => {
    try {
        await checkProject(req.params.projectId);
        let result = await sprintService
            .findByID(req.params.projectId, req.params.sprintId);
        if (!result) {
            res.status(404).json({error: "Sprint not found"});
            return;
        }

        let updateSprint = await sprintService
            .patchByID(req.params.projectId, req.params.sprintId, req.body);

        if (updateSprint.error)
        {
            res.status(422).send({error: updateSprint.error.details});
            return ;
        }

        res.status(200).send(updateSprint);

    } catch (e) {
        res.status(404).json({error: e.toString()});
    }
};

exports.removeById = async (req, res) => {
    try {
       await checkProject(req.params.projectId);
       let sprint = await sprintService
            .findByID(req.params.projectId, req.params.sprintId);

       if (!sprint) {
                    res.status(404).json({error: "Sprint not found"});
                    return;
       }

       await sprintService
            .removeByID(req.params.projectId, req.params.sprintId);

       res.status(204).send({});
    } catch (e) {
        res.status(404).json({error: e.toString()});
    }
};

async function checkProject(id) {
    let project = await projectService.findById(id);
    if (!project) {
        throw new Error('Project not found');
    }
    return (project);
}
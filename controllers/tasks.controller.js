const sprintService = require('../services/sprints.service');
const taskService = require('../services/tasks.service');

exports.insert =async (req, res) => {
    try {
        await checkSprint(req.params.projectId, req.params.sprintId);
        let result = await taskService.create(req.params.projectId, req.params.sprintId, req.body);

        if (result.error) {
            res.status(422).send({error: result.error.details});
            return;
        }
        res.status(201).send({id: result._id});
    } catch (e) {
        res.status(404).send({error: 'Not found'});
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
    try {
        await checkSprint(req.params.projectId, req.params.sprintId);
        let list = await taskService.list(req.params.projectId, req.params.sprintId, limit, page);
        res.status(200).send(list);
    } catch (e) {
        res.status(404).send({error: 'Not found'});
    }
};

exports.findById = async (req, res) => {
    try {
        let task = await checkTask(req.params.projectId, req.params.sprintId, req.params.taskId);
        res.status(200).send(task);
    } catch (e) {
        console.log(e);
        res.status(404).send({error: 'Not found'});
    }
};

exports.putById = async (req, res) => {
    try {
        await checkTask(req.params.projectId, req.params.sprintId, req.params.taskId);
        let task = await taskService.putByID(req.params.projectId, req.params.sprintId, req.params.taskId, req.body);

        if (task.error)
        {
            res.status(422).send({error: task.error.details});
            return ;
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(404).send({error: 'Not found'});
    }
};

exports.patchById = async (req, res) => {
    try {
        await checkTask(req.params.projectId, req.params.sprintId, req.params.taskId);
        let task = await taskService.patchByID(req.params.projectId, req.params.sprintId, req.params.taskId, req.body);

        if (task.error)
        {
            res.status(422).send({error: task.error.details});
            return ;
        }

        res.status(200).send(task);
    } catch (e) {
        res.status(404).send({error: 'Not found'});
    }
};

exports.removeById = async (req, res) => {
   try {
       await checkTask(req.params.projectId, req.params.sprintId, req.params.taskId);
       await taskService.removeByID(req.params.projectId, req.params.sprintId, req.params.taskId);
       res.status(204).send({message: 'Task deleted'});
    } catch (e) {
       res.status(404).send({error: 'Not found'});
   }
};

exports.putUser = async (req, res) => {
    try {
        await checkTask(req.params.projectId, req.params.sprintId, req.params.taskId);
        let task = await taskService.putUser(
            req.params.projectId,
            req.params.sprintId,
            req.params.taskId,
            req.body.userId
        );

        res.status(200).send(task);
    } catch (e) {
        res.status(404).send({error: e});
    }
};

async function checkSprint(projectId, sprintId) {
    let result = await sprintService.findByID(projectId, sprintId);
    if (!result) {
        throw new Error('Sprint not found');
    }
}

async function checkTask(projectId, sprintId, taskId) {
      let result = await taskService.findByID(projectId, sprintId, taskId);
      if (!result) {
          throw new Error('Task not found');
      }

      return result;
}
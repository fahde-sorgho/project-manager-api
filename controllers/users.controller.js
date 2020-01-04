const userService = require('../services/users.service'),
      bcrypt = require('bcrypt'),
      saltRounds = 10;

exports.insert = async (req, res) => {
    try {
        let hash = await bcrypt.hash(req.body.password, saltRounds);

        req.body.password = hash;
        req.body.permissionLevel = 1;
        let user = await userService.createUser(req.body);

        if (user.error) {
            res.status(422).send({error: user.error.details});
            return;
        }

        res.status(201).send({id: user._id});
    } catch (e) {
        res.status(422).send({error: e});
    }
};

exports.getById =async (req, res) => {
    try {
        let user = await userService.findById(req.params.userId);
        res.status(200).send(user);
    } catch (e) {
        res.status(404).send("User not found");
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

    let result = await userService.list(limit, page);
    res.status(200).send(result);
};

exports.putById = async (req, res) => {
    try {
        let hash = await bcrypt.hash(req.body.password, saltRounds);
        req.body.password = hash;
        let user = await userService.putUser(req.params.userId, req.body);

        if (user.error) {
            res.status(422).send({error: user.error.details});
            return;
        }

        res.status(204).send({});
    } catch (e) {
        res.status(404).send("User not found");
    }
};

exports.patchById = async (req, res) => {
    try {
        let hash = null;
        if (req.body.password) {
            hash = await bcrypt.hash(req.body.password, saltRounds);
            req.body.password = hash;
        }

        let user = await userService.patchUser(req.params.userId, req.body);
        if (user.error) {
            res.status(422).send({error: user.error.details});
            return;
        }

        res.status(204).send({});
    } catch (e) {
        res.status(404).send("User not found");
    }
};

exports.removeById = async (req, res) => {
    try {
        await userService.removeById(req.params.userId);
        res.status(204).send({});
    } catch (e) {
        res.status(404).send("User not found");
    }
};

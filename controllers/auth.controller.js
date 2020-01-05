const jwtSecret = require('../config/env.js').jwt_secret,
      jwt = require('jsonwebtoken'),
      userService = require('../services/users.service'),
      crypto = require('crypto');

exports.login = async (req, res) => {
    try {
        let users = await userService.findByEmail(req.body.email);
        let refreshId = req.body.userId + jwtSecret;
        let salt = crypto.randomBytes(16).toString('base64');
        let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
        req.body.refreshKey = salt;
        let token = jwt.sign(req.body, jwtSecret);
        res.status(201).send({userId: users[0]._id, accessToken: token});
    } catch (err) {
        res.status(500).send({errors: err});
    }
};
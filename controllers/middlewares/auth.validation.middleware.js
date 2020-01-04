const jwt = require('jsonwebtoken'),
    secret = require('../../config/env.js').jwt_secret,
    crypto = require('crypto');

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                return res.status(401).send();
            } else {
                req.jwt = jwt.verify(authorization[1], secret);
                return next();
            }

        } catch (err) {
            return res.status(403).send({errors: 'Invalid or Expired Token'});
        }
    } else {
        return res.status(401).send({errors: 'Token not found'});
    }
};
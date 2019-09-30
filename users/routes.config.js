const UsersController = require('./controllers/users.controller');
const AuthValidation = require('../security/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/users', [
        UsersController.insert
    ]);

    app.get('/users', [
        AuthValidation.validJWTNeeded,
        UsersController.list
    ]);

    app.get('/users/:userId', [
        AuthValidation.validJWTNeeded,
        UsersController.getById
    ]);

    app.delete('/users/:userId', [
        AuthValidation.validJWTNeeded,
        UsersController.removeById
    ]);
};
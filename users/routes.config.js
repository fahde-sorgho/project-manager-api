const UsersController = require('./controllers/users.controller');
const AuthValidation = require('../security/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/users', [
        AuthValidation.validJWTNeeded,
        UsersController.insert
    ]);

    /**
     * @swagger
     * /users:
     *    get:
     *      tags:
     *          - "user"
     *      description: This should return all users
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "limit"
     *            type: integer
     *            in: "query"
     *            required: true
     *            default: 10
     *          - name: "page"
     *            type: integer
     *            in: "query"
     *            required: true
     *            default: 0
     *      responses:
     *          200:
     *              description: "successful operation"
     *              schema:
     *                  type: "array"
     *                  items:
     *                      $ref: "#/definitions/User"
     */
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
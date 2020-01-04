const UsersController = require('../controllers/users.controller');
const AuthValidation = require('../controllers/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {

    /**
     * @swagger
     * /users:
     *    post:
     *      tags:
     *          - "users"
     *      description: Create an user
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                  $ref: "#/definitions/UserPost"
     *      responses:
     *          201:
     *              description: "Return created user id"
     *              schema:
     *                  type: object
     *                  properties:
     *                       id:
     *                          type: string
     *                  example:
     *                      id: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d"
     *          422:
     *              description: "Unprocessable Entity"
     */
    app.post('/users', [
        AuthValidation.validJWTNeeded,
        UsersController.insert
    ]);

    /**
     * @swagger
     * /users:
     *    get:
     *      tags:
     *          - "users"
     *      description: Get users list
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
     *      security:
     *           - Bearer: []
     *      responses:
     *          200:
     *              description: "Return user list"
     *              schema:
     *                  type: "array"
     *                  items:
     *                      $ref: "#/definitions/UserGet"
     */
    app.get('/users', [
        AuthValidation.validJWTNeeded,
        UsersController.list
    ]);

    /**
     * @swagger
     * /users/{userId}:
     *    get:
     *      tags:
     *          - "users"
     *      description: Get user by id
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "userId"
     *            type: string
     *            in: "query"
     *            required: true
     *      responses:
     *          200:
     *              description: "Return User"
     *              schema:
     *                   $ref: "#/definitions/UserGet"
     *          404:
     *              description: "User not found"
     */
    app.get('/users/:userId', [
        AuthValidation.validJWTNeeded,
        UsersController.getById
    ]);

    /**
     * @swagger
     * /users/{userId}:
     *    put:
     *      tags:
     *          - "users"
     *      description: Edit all user data by id
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "userId"
     *            type: string
     *            in: "query"
     *            required: true
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                  $ref: "#/definitions/UserPost"
     *      responses:
     *          204:
     *              description: "User updated"
     *          404:
     *              description: "User not found"
     *          422:
     *              description: "Unprocessable Entity"
     */
    app.put('/users/:userId', [
        AuthValidation.validJWTNeeded,
        UsersController.putById
    ]);

    /**
     * @swagger
     * /users/{userId}:
     *    patch:
     *      tags:
     *          - "users"
     *      description: Edit user data by id
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "userId"
     *            type: string
     *            in: "query"
     *            required: true
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *      responses:
     *          204:
     *              description: "User updated"
     *          404:
     *              description: "User not found"
     *          422:
     *              description: "Unprocessable Entity"
     */
    app.patch('/users/:userId', [
        AuthValidation.validJWTNeeded,
        UsersController.patchById
    ]);

    /**
     * @swagger
     * /users/{userId}:
     *    delete:
     *      tags:
     *          - "users"
     *      description: Delete user by id
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "userId"
     *            type: string
     *            in: "query"
     *            required: true
     *      responses:
     *          204:
     *              description: "User deleted"
     *          404:
     *              description: "User not found"
     */
    app.delete('/users/:userId', [
        AuthValidation.validJWTNeeded,
        UsersController.removeById
    ]);
};
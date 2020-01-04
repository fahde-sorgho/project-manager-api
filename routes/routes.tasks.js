const TaskController = require('../controllers/tasks.controller');
const AuthValidation = require('../controllers/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}/tasks:
     *    post:
     *      tags:
     *          - "tasks"
     *      description: Create a task in sprint
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                  $ref: "#/definitions/Task"
     *      responses:
     *          201:
     *              description: "Return created task id"
     *              schema:
     *                  type: object
     *                  properties:
     *                       id:
     *                          type: string
     *                  example:
     *                      id: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d"
     *          404:
     *              description: "Ressource not found"
     *          422:
     *              description: "Unprocessable Entity"
     */
    app.post('/projects/:projectId/sprints/:sprintId/tasks', [
        AuthValidation.validJWTNeeded,
        TaskController.insert
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}/tasks:
     *    get:
     *      tags:
     *          - "tasks"
     *      description: get tasks of sprint
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
     *              description: "Return sprint list"
     *              schema:
     *                  type: "array"
     *                  items:
     *                      $ref: "#/definitions/Task"
     *          404:
     *              description: "Ressource not found"
     */
    app.get('/projects/:projectId/sprints/:sprintId/tasks', [
        AuthValidation.validJWTNeeded,
        TaskController.list
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}/tasks/{taskId}:
     *    get:
     *      tags:
     *          - "tasks"
     *      description: get a task
     *      produces:
     *          - "application/json"
     *      responses:
     *          200:
     *              description: "Task"
     *              schema:
     *                  $ref: "#/definitions/Task"
     *          404:
     *              description: "Ressource not found"
     */
    app.get('/projects/:projectId/sprints/:sprintId/tasks/:taskId', [
        AuthValidation.validJWTNeeded,
        TaskController.findById
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}/tasks/{taskId}:
     *    put:
     *      tags:
     *          - "tasks"
     *      description: get a task
     *      produces:
     *          - "application/json"
     *      responses:
     *          200:
     *              description: "Task"
     *              schema:
     *                  $ref: "#/definitions/Task"
     *          404:
     *              description: "Ressource not found"
     *          422:
     *              description: "Unprocessable Entity"
     */
    app.put('/projects/:projectId/sprints/:sprintId/tasks/:taskId', [
        AuthValidation.validJWTNeeded,
        TaskController.putById
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}/tasks/{taskId}:
     *    patch:
     *      tags:
     *          - "tasks"
     *      description: get a task
     *      produces:
     *          - "application/json"
     *      responses:
     *          200:
     *              description: "Task"
     *              schema:
     *                  $ref: "#/definitions/Task"
     *          404:
     *              description: "Ressource not found"
     *          422:
     *              description: "Unprocessable Entity"
     */
    app.patch('/projects/:projectId/sprints/:sprintId/tasks/:taskId', [
        AuthValidation.validJWTNeeded,
        TaskController.patchById
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}/tasks/{taskId}:
     *    delete:
     *      tags:
     *          - "tasks"
     *      description: delete a task
     *      produces:
     *          - "application/json"
     *      responses:
     *          204:
     *              description: "Task deleted"
     *          404:
     *              description: "Ressource not found"
     */
    app.delete('/projects/:projectId/sprints/:sprintId/tasks/:taskId', [
        AuthValidation.validJWTNeeded,
        TaskController.removeById
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}/tasks/{taskId}/assign:
     *    put:
     *      tags:
     *          - "tasks"
     *      description: Assign task to an user
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                  type: object
     *                  properties:
     *                       userId:
     *                          type: string
     *                  example:
     *                      userId: "2c5ea4c0-4067-11e9-8bad-9b1deb4d3b7d"
     *      responses:
     *          200:
     *              description: "Task"
     *              schema:
     *                  $ref: "#/definitions/Task"
     *          404:
     *              description: "Ressource not found"
     */
    app.put('/projects/:projectId/sprints/:sprintId/tasks/:taskId/assign', [
        AuthValidation.validJWTNeeded,
        TaskController.putUser
    ]);
};
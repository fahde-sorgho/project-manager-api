const SprintsController = require('../controllers/sprints.controller');
const AuthValidation = require('../controllers/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {

    /**
     * @swagger
     * /projects/{projectId}/sprints:
     *    post:
     *      tags:
     *          - "sprints"
     *      description: Create sprints on project
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                  $ref: "#/definitions/Sprint"
     *      responses:
     *          201:
     *              description: "Return created sprint id"
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
    app.post('/projects/:projectId/sprints', [
        AuthValidation.validJWTNeeded,
        SprintsController.insert
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints:
     *    get:
     *      tags:
     *          - "sprints"
     *      description: get sprints of project
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
     *                      $ref: "#/definitions/Sprint"
     *          404:
     *              description: "Ressource not found"
     */
    app.get('/projects/:projectId/sprints', [
        AuthValidation.validJWTNeeded,
        SprintsController.list
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}:
     *    get:
     *      tags:
     *          - "sprints"
     *      description: get sprints of project
     *      produces:
     *          - "application/json"
     *      parameters:
     *      responses:
     *          200:
     *              description: "Sprint"
     *              schema:
     *                  $ref: "#/definitions/Sprint"
     *          404:
     *              description: "Ressource not found"
     */
    app.get('/projects/:projectId/sprints/:sprintId', [
        AuthValidation.validJWTNeeded,
        SprintsController.findById
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}:
     *    put:
     *      tags:
     *          - "sprints"
     *      description: get sprints of project
     *      produces:
     *          - "application/json"
     *      parameters:
     *      responses:
     *          200:
     *              description: "Sprint"
     *              schema:
     *                  $ref: "#/definitions/Sprint"
     *          404:
     *              description: "Ressource not found"
     *          422:
     *              description: "Unprocessable Entity"
     */
    app.put('/projects/:projectId/sprints/:sprintId', [
        AuthValidation.validJWTNeeded,
        SprintsController.putById
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}:
     *    patch:
     *      tags:
     *          - "sprints"
     *      description: get sprints of project
     *      produces:
     *          - "application/json"
     *      parameters:
     *      responses:
     *          200:
     *              description: "Sprint"
     *              schema:
     *                  $ref: "#/definitions/Sprint"
     *          404:
     *              description: "Ressource not found"
     *          422:
     *              description: "Unprocessable Entity"
     */
    app.patch('/projects/:projectId/sprints/:sprintId', [
        AuthValidation.validJWTNeeded,
        SprintsController.patchById
    ]);

    /**
     * @swagger
     * /projects/{projectId}/sprints/{sprintId}:
     *    delete:
     *      tags:
     *          - "sprints"
     *      description: get sprints of project
     *      produces:
     *          - "application/json"
     *      parameters:
     *      responses:
     *          204:
     *              description: "Sprint deleted"
     *          404:
     *              description: "Ressource not found"
     */
    app.delete('/projects/:projectId/sprints/:sprintId', [
        AuthValidation.validJWTNeeded,
        SprintsController.removeById
    ]);
};
const ProjectsController = require('../controllers/projects.controller');
const AuthValidation = require('../controllers/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {

    /**
     * @swagger
     * /projects:
     *    post:
     *      tags:
     *          - "projects"
     *      description: Create an project
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                  $ref: "#/definitions/Project"
     *      responses:
     *          201:
     *              description: "Return created project"
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
    app.post('/projects', [
        AuthValidation.validJWTNeeded,
        ProjectsController.insert
    ]);

    /**
     * @swagger
     * /projects:
     *    get:
     *      tags:
     *          - "projects"
     *      description: Get projects list
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
     *              description: "Return project list"
     *              schema:
     *                  type: "array"
     *                  items:
     *                      $ref: "#/definitions/Project"
     */
    app.get('/projects', [
        AuthValidation.validJWTNeeded,
        ProjectsController.list
    ]);

    /**
     * @swagger
     * /projects/{id}:
     *    get:
     *      tags:
     *          - "projects"
     *      description: Get project by id
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "id"
     *            type: string
     *            in: "query"
     *            required: true
     *      responses:
     *          200:
     *              description: "Project"
     *              schema:
     *                  $ref: "#/definitions/Project"
     *          404:
     *              description: "Project not found"
     */
    app.get('/projects/:id', [
        AuthValidation.validJWTNeeded,
        ProjectsController.getById
    ]);

    /**
     * @swagger
     * /projects/{id}:
     *    put:
     *      tags:
     *          - "projects"
     *      description: put project by id
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "id"
     *            type: string
     *            in: "query"
     *            required: true
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                  $ref: "#/definitions/Project"
     *      responses:
     *          200:
     *              description: "Project"
     *              schema:
     *                  $ref: "#/definitions/Project"
     *          404:
     *              description: "Project not found"
     */
    app.put('/projects/:id', [
        AuthValidation.validJWTNeeded,
        ProjectsController.putById
    ]);

    /**
     * @swagger
     * /projects/{id}:
     *    patch:
     *      tags:
     *          - "projects"
     *      description: Get project by id
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "id"
     *            type: string
     *            in: "query"
     *            required: true
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                  $ref: "#/definitions/Project"
     *      responses:
     *          200:
     *              description: "Project"
     *              schema:
     *                  $ref: "#/definitions/Project"
     *          404:
     *              description: "Project not found"
     */
    app.patch('/projects/:id', [
        AuthValidation.validJWTNeeded,
        ProjectsController.patchById
    ]);

    /**
     * @swagger
     * /projects/{id}:
     *    delete:
     *      tags:
     *          - "projects"
     *      description: Delete project by id
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "id"
     *            type: string
     *            in: "query"
     *            required: true
     *      responses:
     *          204:
     *              description: "Project deleted"
     *          404:
     *              description: "Project not found"
     */
    app.delete('/projects/:id', [
        AuthValidation.validJWTNeeded,
        ProjectsController.removeById
    ]);

    /**
     * @swagger
     * /projects/{id}/team:
     *    post:
     *      tags:
     *          - "projects"
     *      description: add user in project team
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
     *          201:
     *              description: "User added"
     *          400:
     *               description: "Already in project team"
     *          404:
     *              description: "User or project not found"
     */
    app.post('/projects/:id/team', [
        AuthValidation.validJWTNeeded,
        ProjectsController.addInTeam
    ]);

    /**
     * @swagger
     * /projects/{id}/team/{userId}:
     *    delete:
     *      tags:
     *          - "projects"
     *      description: Delete user from project team
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "id"
     *            type: string
     *            in: "query"
     *            required: true
     *          - name: "userId"
     *            type: string
     *            in: "query"
     *            required: true
     *      responses:
     *          204:
     *              description: "user removed from team"
     *          404:
     *              description: "user or project not found"
     */
    app.delete('/projects/:id/team/:userId', [
        AuthValidation.validJWTNeeded,
        ProjectsController.removeFromTeam
    ]);
};
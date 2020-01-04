const checkAuthMiddleware = require('../controllers/middlewares/check.user.middleware'),
      authController = require('../controllers/auth.controller');
      authValidation = require('../controllers/middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {

    /**
     * @swagger
     * /auth:
     *    post:
     *      tags:
     *          - "authentication"
     *      description: Get authentication token
     *      produces:
     *          - "application/json"
     *      parameters:
     *          - name: "body"
     *            in: "body"
     *            required: true
     *            type: object
     *            schema:
     *                      type: object
     *                      properties:
     *                          email:
     *                              type: string
     *                          password:
     *                              type: string
     *                      example:
     *                          email: "test@mail.fr"
     *                          password: "MyPassword"
     *      responses:
     *          201:
     *              description: "Return the token"
     *              schema:
     *                  type: object
     *                  properties:
     *                       accessToken:
     *                          type: "string"
     *                       refreshToken:
     *                          type: "string"
     *                  example:
     *                     accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1ZDg5MzNjODRmMTIyZDYxM2M2MmM5NTQiLCJlbWFpbCI6Im1hcmNvcy5oZW5yaXF1ZUB0b3B0YWwuY29tIiwicGVybWlzc2lvbkxldmVsIjoxLCJwcm92aWRlciI6ImVtYWlsIiwibmFtZSI6Ik1hcmNvcyBTaWx2YSIsInJlZnJlc2hLZXkiOiJjWjhibEtHZWxOSWFoT1JRb01KakxRPT0iLCJpYXQiOjE1NzAxMTE0ODR9.BYhKDEsrfDPNjS7Pqf3k1cL-1tYs--N8Sp2UF_E5mVk"
     *          400:
     *              description: "Missing or invalid credentials"
     *          500:
     *              description: "Internal server error"
     */
    app.post('/auth', [
        checkAuthMiddleware.hasAuthValidFields,
        checkAuthMiddleware.isAuthValid,
        authController.login
    ]);
};
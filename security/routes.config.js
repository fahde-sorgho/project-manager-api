const checkAuthMiddleware = require('./middlewares/check.user.middleware'),
      authController = require('./controllers/auth.controller');
      authValidation = require('./middlewares/auth.validation.middleware');

exports.routesConfig = function (app) {
    app.post('/auth', [
        checkAuthMiddleware.hasAuthValidFields,
        checkAuthMiddleware.isAuthValid,
        authController.login
    ]);

    app.post('/auth/refresh', [
        authValidation.validJWTNeeded,
        authValidation.verifyRefreshBodyField,
        authValidation.validRefreshNeeded,
        authController.refresh_token
    ]);
};
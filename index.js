const config = require('./common/config/env.config.js');

const express = require('express');
const fs = require('fs'),
      path = require('path');
const jsYaml = require('js-yaml');
const app = express();
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');

//Load Documentation
const spec = fs.readFileSync(path.join(__dirname,'doc/swagger.yaml'), 'utf8');
const swaggerDocument = jsYaml.safeLoad(spec);

//Load routes
const UsersRouter = require('./users/routes.config');

app.use(bodyParser.json());
UsersRouter.routesConfig(app);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(config.port, function () {
    console.log('App is listening at port %s', config.port);
    console.log('You can access to documentation on localhost:%s/api-docs',config.port)
});
let databaseName = 'restapi';
let port = 3600;

if ( process.env.NODE_ENV === 'test' ) {
    databaseName = 'restapi-test';
    port = 3700;
}

module.exports = {
    "port": port,
    "appEndpoint": "http://localhost:" + port,
    "apiEndpoint": "http://localhost:" + port + "/api/v1",
    "jwt_secret": "JWTTokenSecretKey",
    "jwt_expiration_in_seconds": 36000,
    "databaseName": databaseName,
    "databaseUrl": '127.0.0.1',
    "databasePort": '27017'
};
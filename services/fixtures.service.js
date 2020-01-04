const config = require('../config/env.js');
const Fixtures = require('node-mongodb-fixtures');
const uri = "mongodb://127.0.0.1:27017/"+config.databaseName;

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    reconnectTries: 30,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0
};

exports.loadUserFixtures = () => {
    const fixtures = new Fixtures({
        mute: true,
        filter: 'users.js'
    });

    return load(fixtures);
};

exports.loadProjectFixtures = () => {
    const fixtures = new Fixtures({
        mute: true,
        filter: 'projects.js'
    });

    return load(fixtures);
};

function load(fixtures) {
    return new Promise((resolve, reject) => {
        fixtures
            .connect(uri,options)
            .then(() => fixtures.unload())
            .then(() => fixtures.load())
            .catch(e => {console.error(e); reject(e);})
            .finally(() => {
                fixtures.disconnect();
                resolve('done')
            });
    });
}
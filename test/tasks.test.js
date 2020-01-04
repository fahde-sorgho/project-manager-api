process.env.NODE_ENV = 'test';

const fixtures = require('../services/fixtures.service');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let token = null;
let projectId = null;
let sprintId = null;
let taskId = null;

chai.use(chaiHttp);

//Our parent block
describe('Tasks', () => {
    before((done) => {
        fixtures.loadUserFixtures().then((result, err) => {
            fixtures.loadProjectFixtures().then( (result, err) => {
                done();
            });
        });
    });

    /*
    * Test /Get token
    */
    describe('/Get token', () => {
        it('it should Get the token', (done) => {
            chai.request(server)
                .post('/api/v1/auth')
                .send({email:'admin@admin.com', password: 'password'})
                .end( (err, res) => {
                    res.should.have.status(201);
                    token = res.body.accessToken;
                    done();
                });
        });
    });

    describe('/Get project id', () => {
        it('it should Get project id', (done) => {
            chai.request(server)
                .get('/api/v1/projects')
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(200);
                    projectId = res.body[0]._id;
                    done();
                });
        });
    });

    describe('/Get sprint id', () => {
        it('it should Get sprint  id', (done) => {
            chai.request(server)
                .get('/api/v1/projects/'+projectId+'/sprints')
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(200);
                    sprintId = res.body[0]._id;
                    done();
                });
        });
    });

    describe('/Get tasks', () => {
        it('it should Get task list', (done) => {
            chai.request(server)
                .get('/api/v1/projects/' + projectId + '/sprints/' + sprintId + '/tasks')
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/Post tasks', () => {
        it('it should Post task', (done) => {
            chai.request(server)
                .post('/api/v1/projects/' + projectId + '/sprints/' + sprintId + '/tasks')
                .set('authorization', 'Bearer '+ token)
                .send ( {
                        name: 'Test sprint',
                        description: 'Desc test sprint',
                        status: 'todo',
                        grade: 8,
                        startDate: '2019-06-10',
                        endDate: '2019-10-10'
                    }
                )
                .end((err, res) => {
                    res.should.have.status(201);
                    taskId = res.body.id;
                    done();
                });
        });
    })

    describe('/Get task by id', () => {
        it('it should get a task', (done) => {
            chai.request(server)
                .get('/api/v1/projects/' + projectId + '/sprints/' + sprintId + '/tasks/' + taskId)
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Put task by id', () => {
        it('it should put a task', (done) => {
            chai.request(server)
                .put('/api/v1/projects/' + projectId + '/sprints/' + sprintId + '/tasks/' + taskId)
                .set('authorization', 'Bearer '+ token)
                .send ( {
                        name: 'Test task put',
                        description: 'Desc test task',
                        status: 'todo',
                        grade: 8,
                        startDate: '2019-06-10',
                        endDate: '2019-10-10'
                    }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Patch task by id', () => {
        it('it should patch a task', (done) => {
            chai.request(server)
                .patch('/api/v1/projects/' + projectId + '/sprints/' + sprintId + '/tasks/' + taskId)
                .set('authorization', 'Bearer '+ token)
                .send ( {
                        name: 'Test task patch'
                    }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Delete task by id', () => {
        it('it should delete a task', (done) => {
            chai.request(server)
                .delete('/api/v1/projects/' + projectId + '/sprints/' + sprintId + '/tasks/' +taskId)
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
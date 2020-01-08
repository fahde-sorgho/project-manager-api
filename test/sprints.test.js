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

chai.use(chaiHttp);

//Our parent block
describe('Sprints', () => {
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

    describe('/Get sprints', () => {
        it('it should Get sprint list', (done) => {
            chai.request(server)
                .get('/api/v1/projects/' + projectId + '/sprints')
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(2);
                    done();
                });
        });
    });

    describe('/Post sprints', () => {
        it('it should Post sprint', (done) => {
            chai.request(server)
                .post('/api/v1/projects/' + projectId + '/sprints')
                .set('authorization', 'Bearer '+ token)
                .send ( {
                    name: 'Test sprint',
                    description: 'Desc test sprint',
                    startDate: '2019-06-10',
                    endDate: '2019-10-11'
                    }
                )
                .end((err, res) => {
                    res.should.have.status(201);
                    sprintId = res.body.id;
                    done();
                });
        });
    })

    describe('/Get sprint by id', () => {
        it('it should get a sprint', (done) => {
            chai.request(server)
                .get('/api/v1/projects/' + projectId + '/sprints/'+sprintId)
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Put sprint by id', () => {
        it('it should put a sprint', (done) => {
            chai.request(server)
                .put('/api/v1/projects/' + projectId + '/sprints/'+sprintId)
                .set('authorization', 'Bearer '+ token)
                .send ( {
                        name: 'Test sprint put',
                        description: 'Desc test sprint',
                        startDate: '2019-06-10',
                        endDate: '2019-10-11'
                    }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Patch sprint by id', () => {
        it('it should patch a sprint', (done) => {
            chai.request(server)
                .patch('/api/v1/projects/' + projectId + '/sprints/'+sprintId)
                .set('authorization', 'Bearer '+ token)
                .send ( {
                        name: 'Test sprint patch'
                    }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Delete sprint by id', () => {
        it('it should delete a sprint', (done) => {
            chai.request(server)
                .delete('/api/v1/projects/' + projectId + '/sprints/'+sprintId)
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
process.env.NODE_ENV = 'test';

const fixtures = require('../services/fixtures.service');

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
let should = chai.should();
let token = null;
let id = null;

chai.use(chaiHttp);

//Our parent block
describe('Projects', () => {

    before((done) => {
        fixtures.loadProjectFixtures().then((result, err) => {
            done();
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

    /*
      * Test the /GET route
      */
    describe('/GET projects', () => {
        it('it should GET all projects', (done) => {
            chai.request(server)
                .get('/api/v1/projects')
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/Post projects', () => {
        it('should /Post a project ', (done) => {
            chai.request(server)
                .post('/api/v1/projects')
                .set('authorization', 'Bearer '+ token)
                .send({
                    name: 'test project',
                    description: 'description project',
                    startDate: '2019-06-10',
                    endDate: '2019-06-10'
                })
                .end( (err, res) => {
                    res.should.have.status(201);
                    id = res.body.id;
                    done();
                });
        });
    });

    describe('/Get project', () => {
        it('should /Get a project ', (done) => {
            chai.request(server)
                .get('/api/v1/projects/'+id)
                .set('authorization', 'Bearer '+ token)
                .end( (err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Put project by id', () => {
        it('it should put a project', (done) => {
            chai.request(server)
                .put('/api/v1/projects/' + id)
                .set('authorization', 'Bearer '+ token)
                .send ( {
                        name: 'test project',
                        description: 'description project',
                        startDate: '2019-06-10',
                        endDate: '2019-06-10'
                    }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Patch project by id', () => {
        it('it should patch a project', (done) => {
            chai.request(server)
                .patch('/api/v1/projects/' + id)
                .set('authorization', 'Bearer '+ token)
                .send ( {
                        name: 'Test project patch'
                    }
                )
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Delete project', () => {
        it('should /Delete a project ', (done) => {
            chai.request(server)
                .delete('/api/v1/projects/'+id)
                .set('authorization', 'Bearer '+ token)
                .end( (err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
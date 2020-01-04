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
describe('Users', () => {

    before((done) => {
        fixtures.loadUserFixtures().then((result, err) => {
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
    describe('/GET users', () => {
        it('it should GET all the users', (done) => {
            chai.request(server)
                .get('/api/v1/users')
                .set('authorization', 'Bearer '+ token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });
        });
    });

    describe('/Post users', () => {
        it('should /Post an user ', (done) => {
            chai.request(server)
                .post('/api/v1/users')
                .set('authorization', 'Bearer '+ token)
                .send({
                            firstName: 'test',
                            lastName: 'user',
                            email:'test@user.com',
                            password: 'password',
                            permissionLevel: 1
                })
                .end( (err, res) => {
                    res.should.have.status(201);
                    id = res.body.id;
                    done();
                });
        });
    });

    describe('/Get user', () => {
        it('should /Get an user ', (done) => {
            chai.request(server)
                .get('/api/v1/users/'+id)
                .set('authorization', 'Bearer '+ token)
                .end( (err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    describe('/Delete user', () => {
        it('should /Delete an user ', (done) => {
            chai.request(server)
                .delete('/api/v1/users/'+id)
                .set('authorization', 'Bearer '+ token)
                .end( (err, res) => {
                    res.should.have.status(204);
                    done();
                });
        });
    });
});
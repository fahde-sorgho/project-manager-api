const UserModel = require('../../models/users.model');
const bcrypt = require('bcrypt');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];
    if (req.body) {
        if (!req.body.email) {
            errors.push('Missing email field');
        }
        if (!req.body.password) {
            errors.push('Missing password field');
        }

        if (errors.length) {
            return res.status(400).send({errors: errors.join(',')});
        } else {
            return next();
        }
    } else {
        return res.status(400).send({errors: 'Missing email and password fields'});
    }
};

exports.isAuthValid = (req, res, next) => {
    UserModel.findByEmail(req.body.email)
        .then((user)=>{
            if(!user[0]){
                res.status(404).send({errors: 'User not found'});
            }else{
                bcrypt.compare(req.body.password, user[0].password, function(err, result) {
                    if (result) {
                        req.body = {
                            userId: user[0]._id,
                            email: user[0].email,
                            permissionLevel: user[0].permissionLevel,
                            provider: 'email',
                            name: user[0].firstName + ' ' + user[0].lastName,
                        };
                        return next();
                    } else {
                        return res.status(400).send({errors: ['Invalid e-mail or password']});
                    }
                });
            }
        });
};
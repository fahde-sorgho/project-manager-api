const mongoose = require('../../common/services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

/**
 * @type {mongoose.Schema}
 *
 * @swagger
 * definitions:
 *  User:
 *      type: "object"
 *      properties:
 *          id:
 *              type: "integer"
 *              format: "int64"
 *          firstName:
 *              type: "string"
 *          lastName:
 *              type: "string"
 *          email:
 *              type: "string"
 *          password:
 *              type: "string"
 *          permissionLevel:
 *              type: "integer"
 *      example:
 *          firstName: "firstName"
 *          lastName: "lastName"
 *          password: "password"
 *          permissionLevel: 1
 *          id: 0
 *          email: "email"
 */
const userSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    permissionLevel: Number
});

const User = mongoose.model('Users', userSchema);

exports.createUser = (userData) => {
    const user = new User(userData);
    return user.save();
};

exports.findById = (id) => {
    return User.findById(id).then((result) => {
        result = result.toJSON();
        delete result._id;
        delete result.__v;
        delete result.password;
        return result;
    });
};

exports.findByEmail = (email) => {
    return User.find({email: email});
};

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        User.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.remove({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

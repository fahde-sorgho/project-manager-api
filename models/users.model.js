const mongoose = require('../services/mongoose.service').mongoose;
const uniqueValidator = require('mongoose-unique-validator');
const Joi = require('@hapi/joi');
const uuid = require('uuid');
const Schema = mongoose.Schema;

/**
 * @type {mongoose.Schema}
 *
 * @swagger
 * definitions:
 *  UserPost:
 *      type: "object"
 *      properties:
 *          _id:
 *              type: "string"
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
 *          _id: 0
 *          email: "email"
 *  UserGet:
 *      type: "object"
 *      properties:
 *          _id:
 *              type: "string"
 *          firstName:
 *              type: "string"
 *          lastName:
 *              type: "string"
 *          email:
 *              type: "string"
 *          permissionLevel:
 *              type: "integer"
 *      example:
 *          firstName: "firstName"
 *          lastName: "lastName"
 *          permissionLevel: 1
 *          _id: ""
 *          email: "email"
 */
const userSchema = new Schema({
    _id: { type: String, default: uuid.v4},
    firstName: String,
    lastName: String,
    email: {type: String, lowercase: true, unique: true,  index: true},
    password: String,
    permissionLevel: Number,
}, {timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }});

userSchema.plugin(uniqueValidator);

const schemaValidator = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName:  Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string()
            .email().required(),
    permissionLevel: Joi.number().required()
});

const User = mongoose.model('Users', userSchema);

exports.userSchema = () => {
    return userSchema;
};

exports.userModel = () => {
    return User;
};

exports.createUser = (userData) => {
    const result = schemaValidator.validate(userData);
    if(result.error) {
        return new Promise( (resolve) =>  {
            resolve(result);
        });
    }

    const user = new User(userData);
    return user.save();
};

exports.findById = (id) => {
    return User.findById(id).then((result) => {
        if(result) {
            result = result.toJSON();
            delete result._id;
            delete result.__v;
            delete result.password;
        }

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
            .select(["-password", "-__v"])
            .exec(function (err, users) {
                if (err) {
                    reject(err);
                } else {
                    resolve(users);
                }
            })
    });
};

exports.putUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, user) {
            if (err) reject(err);

            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.email = userData.email;
            user.password = userData.password;
            user.permissionLevel = userData.permissionLevel;

            const result = schemaValidator.validate(user);
            if(result.error) {
                reject(result.error.details);
                return;
            }

            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })
};

exports.patchUser = (id, userData) => {
    return new Promise((resolve, reject) => {
        User.findById(id, function (err, user) {
            if (err) reject(err);
            for (let i in userData) {
                user[i] = userData[i];
            }
            user.save(function (err, updatedUser) {
                if (err) return reject(err);
                resolve(updatedUser);
            });
        });
    })
};

exports.removeById = (userId) => {
    return new Promise((resolve, reject) => {
        User.deleteOne({_id: userId}, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};

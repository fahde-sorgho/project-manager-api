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

const User = mongoose.model('Users', userSchema);

exports.userSchema = () => {
    return userSchema;
};

exports.userModel = () => {
    return User;
};

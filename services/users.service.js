const Joi = require('@hapi/joi');
const User = require('../models/users.model').userModel();
const Project = require('../models/projects.model').projectModel();

const schemaValidator = Joi.object({
    firstName: Joi.string().min(3).max(30).required(),
    lastName:  Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    email: Joi.string()
        .email().required(),
    permissionLevel: Joi.number().required()
});

exports.createUser = async (userData) => {
    const result = schemaValidator.validate(userData);

    if(result.error) {
        return result;
    }

    let user = new User(userData);
    await user.save();
    return user;
};

exports.findById = async (id) => {
    let user = await checkUser(id);
    user = user.toJSON();
    delete user._id;
    delete user.__v;
    delete user.password;

    return user;
};

exports.findByEmail = async (email) => {
    let user = await User.find({email: email});
    if (!user)
        throw "not found";

    return user;
};

exports.list = async (perPage, page) => {
    return await User.find()
        .limit(perPage)
        .skip(perPage * page)
        .select(["-password", "-v", "-__v"])
        .exec();
};

exports.putUser = async (id, userData) => {
    let user = await checkUser(id);

    user.firstName = userData.firstName;
    user.lastName = userData.lastName;
    user.email = userData.email;
    user.password = userData.password;
    user.permissionLevel = userData.permissionLevel;

    const result = schemaValidator.validate(user);
    if(result.error) {
        return result;
    }
    await user.save();

    return user;
};

exports.patchUser = async (id, userData) => {
    let user = await checkUser(id);

    for (let i in userData) {
        user[i] = userData[i];
    }

    let validation = user.toJSON();
    delete user._id;
    delete user.created_at;
    delete user.updated_at;

    let valid = schemaValidator.validate(validation, {abortEarly: false});
    if(valid.error) {
        return valid;
    }

    await user.save();

    return user;
};

exports.removeById = async (userId) => {
    await checkUser(userId);
    await User.deleteOne({_id: userId});
};

exports.getProjects = async (userId) => {
    return await Project.find({team:{"$in": [userId]}})
        .select(["-_v", "-__v"])
        .exec();
};

async function checkUser(id) {
    let user = await User.findOne({_id: id});
    if (!user)
        throw "not found";

    return user;
}

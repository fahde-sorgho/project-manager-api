const uuid = require('uuid');
const bcrypt = require('bcrypt'),
    saltRounds = 10;

module.exports = [
    {
        _id: uuid.v4,
        firstName : "Admin",
        lastName : "Admin",
        email : "admin@admin.com",
        password : bcrypt.hashSync('password', saltRounds),
        permissionLevel: 1,
        _v: 0
    }
];
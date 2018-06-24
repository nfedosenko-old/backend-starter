const {User} = require('../models');

exports.findUserByProperty = (property, value) => User.findOne({
    where: {
        [`${property}`]: value
    }
});

exports.findUserByEmail = (email) => this.findUserByProperty('email', email);

const db = require('../config/db');
const Sequlize = require('sequelize');

const User = db.define('user', {
    email: {type: Sequlize.DataTypes.STRING, unique: true},
    password: Sequlize.DataTypes.STRING,
    balance: Sequlize.DataTypes.INTEGER,
    token: Sequlize.DataTypes.STRING
});
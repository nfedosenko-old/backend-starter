const db = require('../config/db');
const Sequelize = require('sequelize');

const user = require('./user.model');

exports.User = user(db, Sequelize);

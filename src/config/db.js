const Sequelize = require('sequelize');
const mysql = require('mysql2');
const settings = require('./settings');
const Bluebird = require('bluebird');


const db = new Sequelize('test', 'root', '', {
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;
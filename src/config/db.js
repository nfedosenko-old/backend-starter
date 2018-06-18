const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const mysql = require('mysql2');

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    dialectOptions: {
        insecureAuth: true
    },
    operatorsAliases: Op,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});

module.exports = db;

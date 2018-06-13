const bcrypt = require('bcrypt');

module.exports = (db, Sequelize) => {
    return db.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        balance: Sequelize.DataTypes.INTEGER
    }, {
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validatePassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });
};
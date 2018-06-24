const bcrypt = require('bcrypt');
const crypto = require('crypto');

module.exports = (db, Sequelize) => {
    const UserModel = db.define('user', {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.DataTypes.INTEGER
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            validate: {
                isEmail: true
            }
        },
        username: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        walletAddress: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        balance: {
            type: Sequelize.DataTypes.INTEGER,
            defaultValue: 0
        },
        confirmed: {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false
        },
        confirmationToken: {
            type: Sequelize.DataTypes.STRING
        },
        resetPasswordToken: {
            type: Sequelize.DataTypes.STRING
        }
    });

    UserModel.generateHash = (password) => {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
    };

    UserModel.generateConfirmationToken = () => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(20, (err, buffer) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(buffer.toString('base64'));
                }
            });
        });
    };

    UserModel.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    UserModel.hook('beforeUpdate', (user, options) => {
        if (user.changed('password')) {
            return UserModel.generateHash(user.password).then(password => {
                user.password = password;
            })
        }
    });

    UserModel.hook('beforeCreate', (user, options) => {
        return Promise.all([
            UserModel.generateHash(user.password),
            UserModel.generateConfirmationToken()])
            .then(results => {
                user.password = results[0];
                user.confirmationToken = results[1];
            });
    });

    return UserModel;
};
const bcrypt = require('bcrypt');

module.exports = (db, Sequelize) => {
    const UserModel = db.define('user', {
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
    });

    UserModel.generateHash = (password) => {
        return bcrypt.hash(password, bcrypt.genSaltSync(8));
    };


    UserModel.prototype.validatePassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };

    UserModel.hook('beforeCreate', (user, options) => {
        return UserModel.generateHash(user.password).then(hashedPassword => {
            user.password = hashedPassword;
        });
    });

    return UserModel;
};
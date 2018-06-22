const ApiController = require('./api.controller');
const {User} = require('../models');
const passport = require('passport');
let {getConfirmEmailMailOptions, mailerClient} = require('../utils/mailerClient');

class AuthController extends ApiController {
    constructor(router) {
        super(router, 'auth');
    }

    link(router) {
        router.post(`${this.prefix}/login`, (req, res, next) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return next(err);
                }

                if (!user && info) {
                    return res.status(422).send(info);
                }

                return req.logIn(user, (error) => {
                    if (error) {
                        return next(error);
                    }

                    return res.status(200).json({
                        success: true,
                        data: user
                    });
                });
            })(req, res, next);
        });
        router.post(`${this.prefix}/signup`, this.signup);
        router.post(`${this.prefix}/forgot-password`, this.forgotPassword);
        router.post(`${this.prefix}/reset-password`, this.resetPassword);
    }

    signup(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const walletAddress = req.body.walletAddress;
        const username = req.body.username;

        User.create({email: email, password: password, walletAddress: walletAddress, username: username})
            .then(() => User.findOrCreate({where: {email: email}}))
            .spread((user, created) => {
                const createdUser = user.get({
                    plain: true
                });

                mailerClient.emit('email:send', getConfirmEmailMailOptions(email), (err, result) => {
                    if (err) {
                        return res.json({success: false, data: err});
                    } else {
                        return res.status(200).json({success: true, data: createdUser});
                    }
                });

            });

    }

    forgotPassword(req, res) {
        const email = req.body.email;




        mailerClient.emit('email:send', getConfirmEmailMailOptions(email), (err, result) => {
            if (err) {
                return res.json({success: false, data: err});
            } else {
                return res.json({success: true, data: result});
            }
        });
    }

    resetPassword(req, res) {
        const resetPasswordToken = req.body.resetPasswordToken;
        const newPassword = req.body.password;

        User.findOne({
            where: {
                resetPasswordToken: resetPasswordToken
            }
        }).then(user => {
            if (!user) {
                return res.status(404).json({
                    success: false, data: {
                        message: 'Token seems to be invalid'
                    }
                });
            } else {
                user.updateAttributes({
                    resetPasswordToken: null,
                    password: newPassword
                });
            }
        });
    }

    confirmEmail(req, res) {

    }
}

module.exports = AuthController;

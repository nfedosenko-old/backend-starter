const ApiController = require('./api.controller');
const {User} = require('../models');
const passport = require('passport');
const Promise = require('bluebird');
const {findUserByEmail, findUserByProperty} = require('../utils/selectors');
const {generateToken, generateRedirectLinkWithToken} = require('../utils/helpers');
const {getConfirmEmailMailOptions, getForgotPasswordMailOptions, mailerClient} = require('../utils/mailerClient');

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
        router.post(`${this.prefix}/confirm-email`, this.confirmEmail);
        router.post(`${this.prefix}/logout`, this.logout);
    }

    signup(req, res) {
        const email = req.body.email;
        const password = req.body.password;
        const walletAddress = req.body.walletAddress;
        const username = req.body.username;

        User.create({email: email, password: password, walletAddress: walletAddress, username: username})
            .then(() => User.findOrCreate({where: {email: email}}))
            .spread((user, created) => {
                generateToken(32, 'hex').then(token => {
                    user.updateAttributes({
                        confirmationToken: token
                    });

                    mailerClient.emit('email:send', getConfirmEmailMailOptions(email, {redirectLink: generateRedirectLinkWithToken(req.headers, 'confirm-email', token)}), (err, result) => {
                        if (err) {
                            return res.json({success: false, data: err});
                        } else {
                            return res.status(200).json({success: true, data: user.get()});
                        }
                    });
                });
            });

    }

    forgotPassword(req, res) {
        const email = req.body.email;

        Promise
            .all([findUserByEmail(email), generateToken(32, 'hex')])
            .then(([user, resetPasswordToken]) => {
                if (!user) {
                    return res.status(404).json({
                        success: false, data: {
                            message: 'There is no user with such email'
                        }
                    });
                } else {
                    user.updateAttributes({
                        resetPasswordToken: resetPasswordToken
                    });

                    mailerClient.emit('email:send', getForgotPasswordMailOptions(email, {redirectLink: generateRedirectLinkWithToken(req.headers, 'reset-password', resetPasswordToken)}), (err, result) => {
                        if (err) {
                            return res.json({success: false, data: err});
                        } else {
                            return res.json({success: true, data: result});
                        }
                    });
                }
            });
    }

    resetPassword(req, res) {
        const resetPasswordToken = req.body.resetPasswordToken;
        const newPassword = req.body.password;

        findUserByProperty('resetPasswordToken', resetPasswordToken)
            .then(user => {
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

                    res.status(200).json({success: true, data: {message: 'Password has been updated successfully'}});
                }
            });
    }

    confirmEmail(req, res) {
        const confirmationToken = req.body.confirmationToken;

        findUserByProperty('confirmationToken', confirmationToken)
            .then(user => {
                if (!user) {
                    return res.status(404).json({
                        success: false, data: {
                            message: 'Token seems to be invalid'
                        }
                    });
                } else {
                    user.updateAttributes({
                        confirmed: true,
                        confirmationToken: null
                    });

                    res.status(200).json({success: true, data: {message: 'Email has been confirmed successfully'}});
                }
            });
    }

    logout(req, res) {
        req.logout();
        res.status(200).json({success: true, data: {message: 'Logged out successfully'}});
    }
}

module.exports = AuthController;

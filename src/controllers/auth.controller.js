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
    }

    signup(req, res) {
        const email = req.body.email;
        const password = req.body.password;

        User.create({email: email, password: password})
            .then(() => User.findOrCreate({where: {email: email}}))
            .spread((user, created) => {
                const createdUser = user.get({
                    plain: true
                });

                return res.status(200).json({success: true, data: createdUser});
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
}

module.exports = AuthController;

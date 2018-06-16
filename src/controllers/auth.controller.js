const ApiController = require('./api.controller');
const {User} = require('../models');
const passport = require('passport');

class AuthController extends ApiController {
    constructor(router) {
        super(router, 'auth');
    }

    link(router) {
        router.post(`${this.prefix}/login`, (req, res) => {
            passport.authenticate('local', (err, user, info) => {
                if (err) {
                    return res.status(500).send();
                }

                if (!user && info) {
                    return res.status(422).send(info);
                }

                return res.status(200).json({
                    success: true,
                    data: user
                });
            })(req, res);
        });
        router.post(`${this.prefix}/signup`, this.signup);
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
}

module.exports = AuthController;
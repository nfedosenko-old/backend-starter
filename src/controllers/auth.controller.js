const ApiController = require('./api.controller');
const {User} = require('../models');
const passport = require('passport');

class AuthController extends ApiController {
    constructor(router) {
        super(router, 'auth');
    }

    link(router) {
        router.post(`${this.prefix}/login`, passport.authenticate('local', {failureRedirect: '/login'}), (req, res) => res.redirect('/dashboard'));
        router.post(`${this.prefix}/signup`, this.signup);
    }

    test(req, res) {
        console.log(req.body);
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

                return res.redirect('/login');
            });

    }
}

module.exports = AuthController;
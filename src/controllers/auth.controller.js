const ApiController = require('./api.controller');
const passport = require('passport');

class AuthController extends ApiController {
    constructor(router) {
        super(router, 'auth');
    }

    link(router) {
        router.post('/login', passport.authenticate('local', {failureRedirect: '/login'}), this.login);
        router.post('/signup', this.signup);
    }

    login(req, res) {
        res.redirect('/account');
    }

    signup(req, res) {

    }
}
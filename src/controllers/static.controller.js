const BasicController = require('./basic.controller');

class StaticController extends BasicController {
    constructor(router) {
        super(router, '');
    }

    link(router) {
        router.get(`${this.prefix}`, this.landing);
        router.get(`${this.prefix}/login`, this.login);
        router.get(`${this.prefix}/signup`, this.signup);
        router.get(`${this.prefix}/dashboard`, this.dashboard);
    }

    landing(req, res) {
        res.render('index', {pageTitle: 'EJS'});
    }

    login(req, res) {
        res.render('index', {pageTitle: 'LOGIN'});
    }

    signup(req, res) {
        res.render('index', {pageTitle: 'SIGNUP'});
    }

    dashboard(req, res) {
        res.render('index', {pageTitle: 'DASHBOARD'});
    }
}

module.exports = StaticController;
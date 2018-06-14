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
        res.render('pages/landing', {
            /* send data to view */
        });
    }

    login(req, res) {
        res.render('pages/login', {
            /* send data to view */
        });
    }

    signup(req, res) {
        res.render('signup', {
            /* send data to view */
        });
    }

    dashboard(req, res) {
        res.render('index', {pageTitle: 'DASHBOARD', email: req.user.email});
    }
}

module.exports = StaticController;

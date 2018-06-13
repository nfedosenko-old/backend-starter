const BasicController = require('./basic.controller');

class StaticController extends BasicController {
    constructor(router) {
        super(router, '');
    }

    link(router) {
        router.get(`/${this.prefix}`, this.landing);
        router.get(`/${this.prefix}/login`, this.login);
        router.get(`/${this.prefix}/signup`, this.signup);
        router.get(`/${this.prefix}/dashboard`, this.dashboard);
    }

    landing(req, res) {

    }

    login(req, res) {

    }

    signup(req, res) {

    }

    dashboard(req, res) {

    }
}
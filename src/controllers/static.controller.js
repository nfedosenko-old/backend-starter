const BasicController = require('./basic.controller');
const SmartContractController = require('./smart-contract.controller');

class StaticController extends BasicController {
    constructor(router) {
        super(router, '');
    }

    link(router) {
        router.get(`${this.prefix}`, this.landing);
        router.get(`${this.prefix}/login`, this.login);
        router.get(`${this.prefix}/signup`, this.signup);
        router.get(`${this.prefix}/dashboard`, this.dashboard);
        router.get(`${this.prefix}/blog`, this.blogArchive);
        router.get(`${this.prefix}/forgot-password`, this.forgotPassword);
        router.get(`${this.prefix}/404`, this.pageNotFound);
        router.get(`${this.prefix}/test`, (req, res) => {
            const ct = new SmartContractController();

            ct.getBalance();

            res.json({});
        });
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
        res.render('pages/signup', {
            /* send data to view */
        });
    }

    dashboard(req, res) {
        res.render('pages/index', {
            pageTitle: 'DASHBOARD'
        });
    }

    blogArchive(req, res) {
        res.render('pages/blog-archive', {
            /* send data to view */
        })
    }

    forgotPassword(req, res) {
        res.render('pages/forgot-password', {
            /* send data to view */
        })
    }

    pageNotFound(req, res) {
        res.render('pages/404', {
            /* send data to view */
        })
    }
}

module.exports = StaticController;

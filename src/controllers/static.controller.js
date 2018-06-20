const BasicController = require('./basic.controller');
const SmartContractController = require('./smart-contract.controller');

class StaticController extends BasicController {
    constructor(router) {
        super(router, '');
    }

    link(router) {
        // Public routes
        router.get(`${this.prefix}/login`, this.login);
        router.get(`${this.prefix}/signup`, this.signup);
        router.get(`${this.prefix}/forgot-password`, this.forgotPassword);
        router.get(`${this.prefix}/check-email`, this.checkEmail);
        router.get(`${this.prefix}/account`, this.account);
        router.get(`${this.prefix}/404`, this.pageNotFound);
        router.get(`${this.prefix}/test`, (req, res) => {
            const ct = new SmartContractController();

            ct.getBalance();

            res.json({});
        });

        // Protected routes
        router.get(`${this.prefix}`, this.ensureAuthenticated, this.landing);
        router.get(`${this.prefix}/dashboard`, this.ensureAuthenticated, this.dashboard);
        router.get(`${this.prefix}/blog`, this.ensureAuthenticated, this.blogArchive);

        // Handler for invalid routes
        router.get(`*`, this.pageNotFound);
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

    checkEmail(req, res) {
        res.render('pages/check-email')
    }

    account(req, res) {
        res.render('pages/account');
    }

    pageNotFound(req, res) {
        res.render('pages/404', {
            /* send data to view */
        })
    }

    ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
            next();
        } else {
            res.redirect('/login');
        }
    }
}

module.exports = StaticController;

const BasicController = require('./basic.controller');
const {User} = require('../models');

class UserController extends BasicController {
    constructor(router) {
        super(router, 'user');
    }

    /**
     * initalize API endpoints for the controller
     * @param router
     */
    link(router) {
        router.get(`/${this.prefix}/test`, this.test);
    }

    test(req, res) {
        return res.json({success: true});
    }
}

module.exports = UserController;
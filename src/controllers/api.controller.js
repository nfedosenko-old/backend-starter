const BasicController = require('./basic.controller');

class ApiController extends BasicController {
    constructor(router, prefix) {
        super(router, `/api/${prefix}`);
    }
}
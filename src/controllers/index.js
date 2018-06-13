const controllers = [
    require('./user.controller'),
    require('./static.controller'),
    require('./auth.controller')
];

module.exports = (router) => {
    return controllers.map((controller) => {
        return new controller(router);
    })
};
const controllers = [
    require('./user.controller')
];

module.exports = (router) => {
    return controllers.map((controller) => {
        return new controller(router);
    })
};
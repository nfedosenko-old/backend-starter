const {Router} = require('express');
const passport = require('passport');
const AuthenticationController = require('./controllers/authentication.controller');
const ApplicationController = require('./controllers/application.controller');
const CategoryController = require('./controllers/category.controller');

const router = Router();

router.get('/', (req, res) => {
    res.sendFile('./dist/index.html');
});

router.post('/login', passport.authenticate('local'), AuthenticationController.login);
router.post('/signup', AuthenticationController.register);

router.use(function (req, res, next) {
    passport.authenticate('bearer', {session: false})(req, res, function () {
        next();
    });
});

router.get('/application', ApplicationController.getCurrentUserApplications);
router.post('/application', ApplicationController.createApplication);
router.delete('/application/:id', ApplicationController.removeApplication);


// router.get('/statistic/:applicationId',ApplicationController.onlyApplicationOwnerMiddleware(), null);

router.post('/category/:applicationId', ApplicationController.onlyApplicationOwnerMiddleware(), CategoryController.addCategory);
router.put('/category/:applicationId', ApplicationController.onlyApplicationOwnerMiddleware(), CategoryController.updateCategory);
router.delete('/category/:applicationId', ApplicationController.onlyApplicationOwnerMiddleware(), CategoryController.removeCategory);


module.exports = router;
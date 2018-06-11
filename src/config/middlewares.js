const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const rootPath = require('../rootPath');

module.exports = (app) => {
    app.set('views', path.join(rootPath, '/views'));
    app.set('view engine', 'pug');
    app.enable('trust proxy');
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride());
    app.use(logger('dev'));

    app.use(passport.initialize());
    app.use(passport.session());
};

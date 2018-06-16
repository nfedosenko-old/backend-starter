const express = require('express');
const path = require('path');
const session = require('express-session');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const rootPath = require('../rootPath');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

module.exports = (app, db) => {
    app.set('views', path.join(rootPath, '/views'));
    // set the view engine to ejs
    app.enable('trust proxy');
    app.use(express.static(rootPath + '/views'));
    app.set('view engine', 'ejs');

    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride());
    app.use(logger('dev'));
    app.use(session({
        store: new SequelizeStore({
            db: db
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        checkExpirationInterval: 15 * 60 * 1000,
        expiration: 24 * 60 * 60 * 1000
    }));

    app.use(passport.initialize());
    app.use(passport.session());
};

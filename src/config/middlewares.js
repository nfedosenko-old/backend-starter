const session = require('express-session');
const logger = require('morgan');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const settings = require('./settings');
const passport = require('passport');
const redis = require('redis');
const connectRedis = require('connect-redis');
const jsToJs = require('js-to-js');
const rootPath = require('../rootPath');
const redisClient = redis.createClient(6379, 'localhost');
redisClient.on('connect', () => {
    console.log('Redis Connected');

});

redisClient.on('error', function (err) {
    console.log('Redis error occurred: ' + err);
});

const RedisStore = connectRedis(session);

module.exports = (app) => {
    app.set('views', rootPath);
    app.engine('js', jsToJs);
    app.enable('trust proxy');
    app.use(helmet());
    app.use(cors());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride());
    app.use(session({
        store: new RedisStore({
            client: redisClient
        }),
        resave: false,
        saveUninitialized: false,
        secret: settings.sessionSecret,
        name: 'id'
    }));
    app.use(logger('dev'));

    app.use(passport.initialize());
    app.use(passport.session());
};
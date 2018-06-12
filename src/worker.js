const express = require('express');
const errorHandler = require('errorhandler');
const router = require('./router');
const passportInitalize = require('./config/passport');
const db = require('./config/db');
const middlewares = require('./config/middlewares');
const {gracefulExit} = require('./utils/gracefulExit');

const app = express();

/**
 * Adding Middleware(s)
 */
middlewares(app);


passportInitalize();

app.use('/api', router);

if (app.get('env') === 'development') {
    app.use(errorHandler());
}

/**
 * Starting server
 */

db
    .sync()
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`App listening on port ${process.env.PORT}`);
        });
    });


process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at:', p, 'reason:', reason);
});

/**
 * Graceful exit
 * Clear connections on PM2 process end
 */
process
    .on('SIGINT', () => gracefulExit(db))
    .on('SIGTERM', () => gracefulExit(db));

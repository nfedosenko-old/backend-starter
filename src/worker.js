const express = require('express');
const errorHandler = require('errorhandler');
const settings = require('./config/settings');
const router = require('./router');
const passportInitalize = require('./config/passport');
const dbConnection = require('./config/db');
const middlewares = require('./config/middlewares');
const {gracefulExit} = require('./utils/gracefulExit');

const app = express();
// const db = dbConnection();

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

// db.once('open', () => {
//     app.listen(settings.port, () => {
//         console.log(`App listening on port ${settings.port}`);
//     });
// });

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
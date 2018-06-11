const mongoose = require('mongoose');
const {exec} = require('child_process');
const settings = require('./settings');
const Bluebird = require('bluebird');

module.exports = () => {
    mongoose.connect(settings.dbPath);

    mongoose.Promise = Bluebird;

    const db = mongoose.connection;

    db.on('error', (error) => {
        console.error(`Mongoose Error ${error}`);
        const mongod = exec('mongod');

        mongod.stdout.once('data', (data) => {
            mongoose.connect(settings.dbPath);
            mongod.unref();
        });
    });

    db.once('open', () => {
        console.log('MongoDB connected');
    });

    return db;
};
const mongoose = require('mongoose');
const {exec} = require('child_process');
const Bluebird = require('bluebird');

module.exports = () => {
    mongoose.connect(process.env.DB_PATH);

    mongoose.Promise = Bluebird;

    const db = mongoose.connection;

    // db.on('error', (error) => {
    //     console.error(`Mongoose Error ${error}`);
    //     const mongod = exec('mongod');
    //
    //     mongod.stdout.once('data', (data) => {
    //         mongoose.connect(process.env.DB_PATH);
    //         mongod.unref();
    //     });
    // });

    db.once('open', () => {
        console.log('MongoDB connected');
    });

    return db;
};

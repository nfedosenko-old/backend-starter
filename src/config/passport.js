const passport = require('passport');
const BearerStrategy = require('passport-http-bearer');
const User = require('../models/user.model');

module.exports = () => {
    // passport.serializeUser(User.serializeUser());
    // passport.deserializeUser(User.deserializeUser());
    //
    // passport.use(User.createStrategy());
    //
    // passport.use(new BearerStrategy(
    //     (token, done) => {
    //         User.find({accessToken: token}, function (err, user) {
    //             if (err) {
    //                 return done(err);
    //             }
    //             if (!user.length) {
    //                 return done(null, false);
    //             }
    //             return done(null, user[0], {scope: 'all'});
    //         });
    //     }
    // ));
};
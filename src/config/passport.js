const passport = require('passport');
const LocalStrategy = require('passport-local');
const {User} = require('../models');

module.exports = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        User.findById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });

    passport.use('local', new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, email, password, done) => {
        User.findOne({
            where: {
                email: email
            }
        }).then((user) => {
            if (!user) {
                return done(null, false);
            }

            if (!user.validatePassword(password)) {
                return done(null, false);
            }

            return done(null, user.get());
        });
    }));
};
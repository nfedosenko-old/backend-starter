const passport = require('passport');
const LocalStrategy = require('passport-local');
const {User} = require('../models');

module.exports = () => {
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
                return done(null, false, {
                    success: false,
                    data: {
                        message: 'There is no such user'
                    }
                });
            }

            if (!user.validatePassword(password)) {
                return done(null, false, {
                    success: false,
                    data: {
                        message: 'Incorrect password'
                    }
                });
            }

            console.log(user.get());

            return done(null, user.get());
        });
    }));

    passport.serializeUser((user, done) => {
        console.log('serializeUser', user);
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        console.log('deserializeUser', id);
        User.findById(id).then((user) => {
            if (user) {
                done(null, user.get());
            } else {
                done(user.errors, null);
            }
        });
    });
};

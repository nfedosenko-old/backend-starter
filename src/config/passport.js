const passport = require('passport');
const LocalStrategy = require('passport-local');
const {User} = require('../models');

module.exports = () => {
    passport.use('local', new LocalStrategy({
        usernameField: 'emailOrUsername',
        passwordField: 'password',
        passReqToCallback: true
    }, (req, emailOrUsername, password, done) => {
        User.findOne({
            where: {
                $or: [
                    {
                        email: emailOrUsername
                    },
                    {
                        username: emailOrUsername
                    }
                ]
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

            return done(null, user.get());
        });
    }));

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
};

var LocalStrategy = require("passport-local").Strategy;
var bCrypt = require("bcrypt-nodejs");
var mongoose = require("mongoose");

var User = mongoose.model("User");

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        console.log("serializing user: ", user._id);
        
        return done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            if (err) {
                return done(err, false);
            }

            if (!user) {
                return done("User not found", false);
            }

            return done(user, true);
        });
    });

    passport.use("login", new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {
        User.findOne({username: username}, function (err, user) {
            if (err) {
                return done(err, false);
            }

            if (!user) {
                return done("Username not found", false);
            }

            if (!isValidPassword(user, password)) {
                return done("Password incorrect", false);
            }

            return done(null, user);
        });
    }));

    passport.use("signup", new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {
        User.findOne({username: username}, function(err, user) {
            var newUser;

            if (err) {
                return done(err, false);
            }

            if (user) {
                return done("username is already taken", false);
            }

            newUser = new User();

            newUser.username = username;
            newUser.password = createHash(password);

            newUser.save(function (err, user) {
                if (err) {
                    return done(err, false);
                }

                console.log("successfully signed up user " + username);

                return done(null, user);
            });
        });
    }));

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    };

    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
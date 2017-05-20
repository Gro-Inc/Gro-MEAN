var mongoose = require("mongoose");
var User = mongoose.model("User");
var LocalStrategy = require("passport-local").Strategy;
var bCrypt = require("bcrypt-nodejs");
var firebase = require("firebase");

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
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

            return done(err, user);
        });
    });

    passport.use("login", new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {
        var newUser = new User();

        firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
            // Handle Errors here.
            console.log(error.code + " - " + error.message);
            return done(error.message, null);
        });

        newUser.username = username;
        newUser.password = createHash(password);

        return done(null, newUser);
    }));

    passport.use("signup", new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {
        var newUser = new User();

        firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
            console.log(error.code + " - " + error.message);
            return done(error.message, null);
        });

        newUser.username = username;
        newUser.password = createHash(password);

        return done(null, newUser);
    }));

    var isValidPassword = function (user, password) {
        return bCrypt.compareSync(password, user.password);
    };

    var createHash = function (password) {
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    };
};
var LocalStrategy = require("passport-local").Strategy;
var bCrypt = require("bcrypt-nodejs");
var firebase = require("firebase");

module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        return done(null, user._id);
    });

    passport.deserializeUser(function (id, done) {
        // TODO
    });

    passport.use("login", new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {
        firebase.auth().signInWithEmailAndPassword(username, password).catch(function(error) {
            // Handle Errors here.
            console.log(error.code + " - " + error.message);
            return done(error.message, null);
        });

        return done(null, username);
    }));

    passport.use("signup", new LocalStrategy({
        passReqToCallback : true
    },
    function (req, username, password, done) {
        firebase.auth().createUserWithEmailAndPassword(username, password).catch(function(error) {
            console.log(error.code + " - " + error.message);

            return done(error.message, null);
        });

        return done(null, username);
    }));
};
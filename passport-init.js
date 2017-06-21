const LocalStrategy = require("passport-local").Strategy;
const firebase = require("firebase");
class User {
}
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
        return done(null, user._id);
    });
    passport.use("login", new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        firebase.auth().signInWithEmailAndPassword(username, password).catch(function (error) {
            return done(error.message, null);
        });
        return done(null, username);
    }));
    passport.use("signup", new LocalStrategy({
        passReqToCallback: true
    }, function (req, username, password, done) {
        const user = new User();
        firebase.auth().createUserWithEmailAndPassword(username, password).catch(function (error) {
            return done(error.message, null);
        });
        user.username = username;
        user.firstName = req.param("firstName");
        user.lastName = req.param("lastName");
        return done(null, user);
    }));
};
//# sourceMappingURL=passport-init.js.map
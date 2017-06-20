const express = require('express');
const router = express.Router();

module.exports = function (passport) {
    //log in
    router.post('/login', passport.authenticate('login', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //sign up
    router.post('/signup', passport.authenticate('signup', {
        successRedirect: '/auth/success',
        failureRedirect: '/auth/failure'
    }));

    //log out
    router.get('/signout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

    //sends successful login state back to angular
    router.get('/success', function (req, res) {
        res.render("/signIn", {title: "Signed In"});
    });

    //sends failure login state back to angular
    router.get('/failure', function (req, res) {
        res.render("/register", {title: "Register"});
    });

    return router;
};
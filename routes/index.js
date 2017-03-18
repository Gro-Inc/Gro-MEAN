var express = require('express');
var router = express.Router();

router.get("/", function (req, res, next) {
    res.render("index", {title: "Gro"});
}).get("/login", function (req, res, next) {
    res.render("login", {title: "Login"});
}).get("/register", function (req, res, next) {
    res.render("register", {title: "Register"});
});

module.exports = router;
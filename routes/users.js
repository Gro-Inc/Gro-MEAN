var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var User = mongoose.model("User");

router.post('/register', function (req, res) {
    var user = new User({
        username: req.query.username,
        password: req.query.password,
        firstName: req.query.firstName,
        lastName: req.query.lastName
    });

    user.save(function (err, message) {
        if (err) {
            throw err;
        }
    });

    res.send("Registered");
});

module.exports = router;
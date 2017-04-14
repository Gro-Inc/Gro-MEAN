const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const User = mongoose.model("User");

router.post('/register', function (req, res) {
    const user = new User({
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
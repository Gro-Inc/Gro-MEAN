var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

router.post('/register', function (req, res) {
    mongoClient.connect("mongodb://localhost:27017/GroUser", function (err, db) {
        db.collection('User', function (err, collection) {
            collection.insert({
                username: req.query.username,
                password: req.query.password,
                firstName: req.query.firstName,
                lastName: req.query.lastName
            });
        });
        
        res.send("Registered");
    });
});

router.get("/get-users", function (req, res) {
    mongoClient.connect("mongodb://localhost:27017/GroUser", function (err, db) {
        var users = [];

        db.collection("User", function (erro, collection) {
            collection.find().toArray(function (err, items) {
                if (err) {
                    throw err;
                }

                res.send(items);
            });
        });
    });
});

module.exports = router;
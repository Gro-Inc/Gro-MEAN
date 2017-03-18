var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;

/* GET users listing. */
router.get('/get-messages', function (req, res, next) {
    //   res.send('respond with a resource');

    // Connect to the db
    mongoClient.connect("mongodb://localhost:27017/GroChat", function (err, db) {
        db.collection('Messages', function (err, collection) {

            collection.find().toArray(function (err, items) {
                if (err) {
                    throw err;
                }

                res.send(items);
            });

        });
        //res.send(messages);
    });
});

/* GET users listing. */
router.post('/send-message', function (req, res, next) {
    //   res.send('respond with a resource');

    // Connect to the db
    mongoClient.connect("mongodb://localhost:27017/GroChat", function (err, db) {
        db.collection('Messages', function (err, collection) {
            collection.insert({id: 1, message: req.query.message});
        });

        res.send(req.query.message);
    });
});

module.exports = router;
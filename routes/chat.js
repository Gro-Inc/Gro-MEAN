var express = require('express');
var router = express.Router();
var mongoose = require("mongoose");

var messageSchema = new mongoose.Schema({
    userId: Number,
    message: String
});

var Message = mongoose.model("Message", messageSchema);

/* GET users listing. */
router.get('/get-messages', function (req, res, next) {
    //   res.send('respond with a resource');

    // Connect to the db
    Message.find({}, function (err, messages) {
        if (err) {
            throw err;
        }

        res.send(messages);
    });
});

/* GET users listing. */
router.post('/send-message', function (req, res, next) {
    //   res.send('respond with a resource');

    var message = new Message({userId: 1, message: req.query.message});

    // Connect to the db
    message.save(function (err, message) {
        if (err) {
            throw err;
        }
    });

    res.send(req.query.message);
});

module.exports = router;
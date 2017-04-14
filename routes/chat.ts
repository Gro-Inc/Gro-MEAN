let express = require('express');
let router = express.Router();
let mongoose = require("mongoose");

const Message = mongoose.model("Message");

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

router.post('/send-message', function (req, res, next) {
    //   res.send('respond with a resource');
    const message = new Message({userId: 1, message: req.query.message});

    // Connect to the db
    message.save(function (err, message) {
        if (err) {
            throw err;
        }
    });

    res.send(req.query.message);
});

module.exports = router;
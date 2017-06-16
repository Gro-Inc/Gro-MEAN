const express = require('express');
const router = express.Router();
const firebase = require("firebase");
const messagesDb = firebase.database().ref("/messages");

class Message{
    text : string;
};

router.get('/get-messages', function (req, res, next) {
    const user = firebase.auth().currentUser;

    // Connect to the db
    if (user != null) {
        messagesDb.once("value", function(snapshot) {
            const messages = snapshot.val();

            res.send(messages);
        });
    }
});

router.post('/send-message', function (req, res, next) {
    const user = firebase.auth().currentUser;
    const newMessage = new Message();
    const updates = {};

    if (user != null) {
        newMessage.text = req.param("message");

        updates[messagesDb.push().key] = newMessage;

        messagesDb.update(updates);

        res.send(newMessage.text);
    }
});

module.exports = router;
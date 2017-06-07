const express = require('express');
const router = express.Router();
const firebase = require("firebase");

router.get('/get-messages', function (req, res, next) {
    const user = firebase.auth().currentUser;

    // Connect to the db
    if (user != null) {
        const database = firebase.database();
        const userId = firebase.auth().currentUser.uid;
        const messages = database.child("/messages");

        return firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {
            const username = snapshot.val().username;
        });
    }
});

router.post('/send-message', function (req, res, next) {
    // TODO
});

module.exports = router;
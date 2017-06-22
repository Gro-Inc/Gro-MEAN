const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const messagesDb = admin.database().ref("/messages");
class Message {
}
router.get('/get-messages', function (req, res, next) {
    // Connect to the db
    admin.auth().verifyIdToken(req.param("token")).then(function (decodedToken) {
        messagesDb.once("value", function (snapshot) {
            const messages = snapshot.val();
            res.send(messages);
        });
    }).catch(function (error) {
        console.log("error: " + error);
    });
});
router.post('/send-message', function (req, res, next) {
    admin.auth().verifyIdToken(req.param("token")).then(function (decodedToken) {
        const newMessage = new Message();
        const updates = {};
        newMessage.text = req.param("message");
        updates[messagesDb.push().key] = newMessage;
        messagesDb.update(updates);
        res.send(newMessage.text);
    }).catch(function (error) {
        console.log("error: " + error);
    });
});
module.exports = router;
//# sourceMappingURL=chat.js.map
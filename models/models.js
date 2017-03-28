var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({
    userId: Number,
    message: String
});

var userSchema = new mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String
});

mongoose.model("User", userSchema);
mongoose.model("Message", messageSchema);
var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var admin = require("firebase-admin");
require("firebase/auth");
var serviceAccount = require("./Gro-Project-f55952e9a1c0.json");

var config = {
    credential: admin.credential.cert(serviceAccount),
    apiKey: "AIzaSyDpYA6KUAEsMX_SbpTGA5PJjT_F09quMls",
    authDomain: "gro-project.firebaseapp.com",
    databaseURL: "https://gro-project.firebaseio.com",
    storageBucket: "gro-project.appspot.com",
    messagingSenderId: "870268988730"
};

admin.initializeApp(config);

var index = require("./routes/index");
var chat = require("./routes/chat");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
app.use(logger("dev"));
app.use(session({
    secret: "some secret"
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    indentedSyntax: true,
    sourceMap: true
}));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", index);
app.use("/chat", chat);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

// error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.render('partials/error', {
        status: err.status || 500,
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

module.exports = app;
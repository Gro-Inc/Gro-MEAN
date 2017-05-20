var express = require("express");
var path = require("path");
var favicon = require("serve-favicon");
var logger = require("morgan");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
var passport = require("passport");
var firebase = require("firebase/app");
require("firebase/auth");

var config = {
    apiKey: "AIzaSyDpYA6KUAEsMX_SbpTGA5PJjT_F09quMls",
    authDomain: "gro-project.firebaseapp.com",
    databaseURL: "https://gro-project.firebaseio.com",
    projectId: "gro-project",
    storageBucket: "gro-project.appspot.com",
    messagingSenderId: "870268988730"
};

firebase.initializeApp(config);

require("./models/models");

var index = require("./routes/index");
var users = require("./routes/users");
var chat = require("./routes/chat");
var authenticate = require("./routes/authenticate")(passport);
var mongoose = require("mongoose");
// mongoose.connect("mongodb://localhost:27017/Gro");

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
app.use(passport.initialize());
app.use(passport.session());

app.use("/", index);
app.use("/user", users);
app.use("/chat", chat);
app.use("/auth", authenticate);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

var initPassport = require("./passport-init")(passport);

// error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.render('partials/error', {
        status: err.status || 500,
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

var debug = require('debug')('Gro-MEAN:server');
var http = require("http");

/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    var bind;

    if (error.syscall !== "listen") {
        throw error;
    }

    bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}

module.exports = app;
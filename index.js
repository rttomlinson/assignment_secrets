"use strict";

const app = require('express')();

// Require and mount the cookie and body parser middlewares
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

// Set up express-handlebars
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
    defaultLayout: "main"
}));
app.set("view engine", "handlebars");


const mongoose = require('mongoose');
app.use((req, res, next) => {
    if (mongoose.connection.readyState) {
        next();
    }
    else {
        mongoose.connect("mongodb://localhost/test")
            .then(() => next());
    }
});

const User = require('./models/User');
const {
    createSignedSessionId,
    loginMiddleware,
    logginInOnly,
    loggedOutOnly
} = require('./services/Session');

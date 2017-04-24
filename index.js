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

////////////////////////////////////////////
// Flash Messages
/////////////////////////////////////////////
var flash = require('express-flash-messages');
app.use(flash());



let {
    loggedInOnly,
    validateSessionId
} = require("./services/Session");

app.use(validateSessionId);

const sessionsRouter = require("./routers/sessions");
app.use("/", sessionsRouter);
app.get("/", loggedInOnly, (req, res) => {
    res.render('home');
});


app.listen(3000, () => {
    console.log("Server running");
});

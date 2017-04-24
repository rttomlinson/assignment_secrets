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

const cleanDb = require("./seeds/clean")

const mongoose = require('mongoose');
app.use((req, res, next) => {
    if (mongoose.connection.readyState) {
        next();
    }
    else {
        mongoose.connect("mongodb://localhost/test")
            .then(() => {
                // cleanDb().then(() => {
                    next()   
                // })
            });
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
const secretsRouter = require('./routers/secrets');
const sessionsRouter = require("./routers/sessions");
const homeRouter = require("./routers/home")

app.use("/", sessionsRouter);
app.use("/secrets", secretsRouter);
app.use("/", homeRouter);


app.listen(process.env.PORT || 3000, () => {
    console.log("Server running");
});

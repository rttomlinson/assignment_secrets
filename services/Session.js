"use strict";
const secret = process.env["secret"] || "puppies";
const md5 = require("md5");
const {
    User
} = require("../models");


let Session = {};

Session.createSignedSessionId = (email) => {
    return `${email}:${generateSignature(email)}`;
};

function generateSignature(email) {
    return md5(email + secret);
}

Session.validateSessionId = (req, res, next) => {
    //check for cookie
    let sessionId = req.cookie.sessionId;
    if (!sessionId) {
        return next();
    }
    let [email, signature] = sessionId.split(":");
    //check if cookie matches the generated hash
    if (signature === generateSignature(email)) {
        User.findOne({
            email: email
        }).then((user) => {
            req.user = user;
            res.locals.currentUser = user;
            next();
        })
    }
    else {
        res.end("Nice try");
    }

};

Session.loggedInOnly = (req, res, next) => {
    if (req.user) {
        next()
    }
    else {
        res.redirect("/login");
    }
}

Session.loggedOutOnly = (req, res, next) => {
    if (!req.user) {
        next()
    }
    else {
        res.redirect("/");
    }
}




module.exports = Session;

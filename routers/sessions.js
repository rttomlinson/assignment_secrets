const express = require("express");
const router = express.Router();

const {
    User
} = require('../models');
const {
    createSignedSessionId,
    validateSessionId,
    loggedInOnly,
    loggedOutOnly
} = require('../services/Session');


router.get("login", loggedOutOnly, (req, res) => {
    res.render("sessions/login")
});

router.post("login", loggedOutOnly, (req, res, next) => {
    let {
        email,
        password
    } = req.body;
    User.findOne({
            email
        })
        .then(user => {
            if (user.validatePassword(password)) {
                res.cookie('sessionId', createSignedSessionId(email));
                res.redirect('/');
            }
            else {

                res.redirect("/login");
            }
        })
        .catch((err) => {
            res.end(`Error getting the data from db`);
        });
});

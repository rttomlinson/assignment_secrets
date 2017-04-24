const express = require("express");
const router = express.Router();

const { User } = require('../models');
const {
    createSignedSessionId,
    validateSessionId,
    loggedInOnly,
    loggedOutOnly
} = require('../services/Session');


router.get("login", loggedOutOnly, (req, res) => {
	res.render("sessions/login")
})






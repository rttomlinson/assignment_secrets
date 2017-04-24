const express = require("express");
const router = express.Router();
const {
    User,
    Secret
} = require("../models")
const {
    loggedInOnly
} = require("../services/Session.js")



router.get("/", loggedInOnly, (req, res) => {
    let mySecretsPromise = Secret.find({
        author: req.user._id
    }).populate("requestedUsers");
    let sharedSecretsPromise = Secret.find({
        authorizedUsers: req.user._id
    });
    Promise.all([mySecretsPromise, sharedSecretsPromise])
        .then(([mySecrets, sharedSecrets]) => {
            console.log("sharedsecrets", sharedSecrets);
            console.log("mysecrets", mySecrets);
            res.render("home", {
                mySecrets,
                sharedSecrets
            });
        });
});






module.exports = router;

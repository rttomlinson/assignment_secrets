const express = require("express");
const router = express.Router();
const {
    Secret
} = require("../models");
const hSecrets = require('../helpers/secretsHelpers');



router.get('/', function(req, res) {
    res.redirect("/secrets/all");
});

router.post('/new', function(req, res) {
    let text = req.body["new-secret"];
    let secret = new Secret({
        text: text,
        author: req.user._id,
        authorizedUsers: [],
        requestedUsers: []
    });
    secret.save().then(() => {
        res.redirect("/");
    });
});

router.get("/all", (req, res) => {
    hSecrets.getAllView(req.user._id).then((secrets) => {
        res.render("secrets", {
            secrets
        });
    });
});


router.post("/request", function(req, res, next) {
    //getting the secretid off the body
    //looking up the secret by sercret id and updating the requested user
    let secretId = req.body.secretId;



})


module.exports = router;

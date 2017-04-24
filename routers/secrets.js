const express = require("express");
const router = express.Router();
const {
    Secret
} = require("../models")



router.get('/', function(req, res) {

});

router.post('/new', function(req, res) {
    let text = req.body["new-secret"];
    let secret = new Secret({
        text: text,
        author: req.user._id,
        authorizedUsers: []
    })
    secret.save().then(() => {
        res.redirect("/");
    })
});


module.exports = router;

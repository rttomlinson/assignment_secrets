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
        authorizedUsers: [],
        requestedUsers: []
    })
    secret.save().then(() => {
        res.redirect("/");
    })
});

router.get("/all", (req, res) => {
    Secret.find().populate("author").then((secrets) => {
        res.render("secrets", {secrets})
    })
})


module.exports = router;

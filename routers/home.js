const express = require("express");
const router = express.Router();
const { User, Secret } = require("../models")
const {loggedInOnly} = require("../services/Session.js")



router.get("/", loggedInOnly, (req, res) => {
	let user = req.user;
	let mySecretsPromise = Secret.find({
		author: req.user._id
	});
	let sharedSecretsPromise = Secret.$where(
		'this.authorizedUsers.includes(user._id)'
	);
	Promise.all([mySecretsPromise, sharedSecretsPromise])
		.then(([mySecrets, sharedSecrets]) => {
			console.log("MY SECRETS", mySecrets);
			console.log("SHARED SECRETS", sharedSecrets);
			res.render("home", { mySecrets, sharedSecrets });
		})
});






module.exports = router;
"use strict";

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SecretSchema = new Schema({
	text: {
		type: String,
		required: true
	},
	author: {
    type: Schema.Types.ObjectId,
    ref: "User"
	},
	authorizedUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User" 
  	}],
  requestedUsers: [{
    type: Schema.Types.ObjectId,
    ref: "User" 
  	}]
}, {
	timestamps: true
});


var Secret = mongoose.model("Secret", SecretSchema);

module.exports = Secret;
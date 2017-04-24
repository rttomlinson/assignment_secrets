var mongoose = require('mongoose');
var bluebird = require('bluebird');

mongoose.Promise = bluebird;

var models = {};

models.User = require("./user");
models.Secret = require("./secret");


module.exports = models;
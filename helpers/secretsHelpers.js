"use strict";
const {
    User,
    Secret
} = require("../models");


let SecretsHelpers = {};

SecretsHelpers.getUsersSecrets = (id) => {
    return Secret.find({
        author: id
    });
};
SecretsHelpers.getAuthorizedSecrets = (id) => {
    return Secret.find({
        authorizedUsers: id
    });
};

SecretsHelpers.getAllView = (id) => {
    return Secret.find()
        .populate("author")
        .then((secrets) => {
            secrets.forEach((secret) => {
                //get if id is in the authorizedUsers array
                //if so then set isAuthorized to true
                if (secret.authorizedUsers.includes(id)) {
                    secret.isAuthorized = true;
                }
            });
            return secrets;
        });
};

SecretsHelpers.getSecretById = (id) => {

}


function cleanSecretsPerUser() {

}


module.exports = SecretsHelpers;

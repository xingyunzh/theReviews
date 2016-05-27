var express = require("express");
var router = express.Router();

var feedbackAPI = require("./feedback-api");
var userAPI = require("./user-api");
var teamAPI = require("./team-api");
var projectAPI = require("./project-api");
var changeRequestAPI = require("./change-request-api");
var iterationAPI = require("./iteration-api");


module.exports = router;

router.use("/feedback", feedbackAPI);
router.use("/user", userAPI);
router.use("/team", teamAPI);
router.use("/project", projectAPI);
router.use("/changeRequest", changeRequestAPI);
router.use("/iteration", iterationAPI);
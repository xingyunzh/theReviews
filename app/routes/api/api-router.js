var express = require("express");
var router = express.Router();

var feedbackAPI = require("./feedback-api");
var userAPI = require("./user-api");
var teamAPI = require("./team-api");

module.exports = router;

router.use("/feedback", feedbackAPI);
router.use("/user", userAPI);
router.use("/team", teamAPI);
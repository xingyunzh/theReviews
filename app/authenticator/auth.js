var express = require("express");
var router = express.Router();
var _ = require("lodash");
var tokenManager = require("../util/token-manager");
var User = require("../model/user");

var auth = {};
auth.router = router;

module.exports = auth;


auth.authenticator = function(req, res, next){
	if (req.headers['x-access-token']){
		tokenManager.resolveUserFromToken(req.headers['x-access-token']).then(function(user){
			if(user){
				req.user = user;
				next();
			}
			else {
				res.sendStatus(401);
			}
		});
	}
	else {
		res.sendStatus(401);
	}
};

auth.router.route("/login")
	.get(function(req, res) {
		res.render("login");
	})
	.post(function(req, res){
		User.findOne({username:req.body.username, password:req.body.password}).exec().then(function(user){
			if (user) {
				tokenManager.resolveTockenFromUser(user).then(function(tks){
					res.json({status:0, token:tks});
				})
			}else {
				res.sendStatus(404);
			};
		})
		.catch(function(error){
			res.sendStatus(500);
		});
	});

auth.router.get("/logout", function(req, res) {
	Token.findOneAndRemove({uid : req.user._id}).exec();

	res.status(200).json({});
});

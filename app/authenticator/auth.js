var express = require("express");
var router = express.Router();
var _ = require("lodash");
var tokenManager = require("../util/token-manager");
var User = require("../model/user");
var util = require("../util/shared/util");

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

auth.router.get("/myself", auth.authenticator, function (req, res) {
	 /* body... */ 
	 res.json(util.wrapBody(req.user));
});

auth.router.route("/login")
	.get(function(req, res) {
		res.render("login");
	})
	.post(function(req, res){
		User.findOne({username:req.body.username, password:req.body.password}).exec().then(function(user){
			if (user) {
				tokenManager.resolveTokenFromUser(user).then(function(tks){
					res.json(util.wrapBody({token:tks.jwtToken, uid:tks.uid}));
				}).catch(function(error){
					res.json(util.wrapBody(error, "SystemError"))
				})
			}else {
				res.json(util.wrapBody(null, 'NotFound'));
			};
		})
		.catch(function(error){
			res.json(util, wrapBody(null, 'ServerError'));
		});
	});

auth.router.get("/logout", function(req, res) {
	Token.findOneAndRemove({uid : req.user._id}).exec();

	res.status(200).json({});
});

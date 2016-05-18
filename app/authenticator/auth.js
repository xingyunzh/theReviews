var express = require("express");
var router = express.Router();
var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var _ = require("lodash");

var users = require("./user-data.json");

var auth = {};
auth.router = router;

module.exports = auth;

passport.use(new LocalStrategy(function(username, password, done){
	var user = _.find(users, function(o){
		return o.username.toLowerCase() === username.toLowerCase();
	});

	if (user && user.password === password) {
		done(null, user);
	}
	else {
		done(null, false);
	}

}));

passport.serializeUser(function(user, done){
	done(null, user.id);
});

passport.deserializeUser(function(id, done){
	var user = _.find(users, function(o){
		return o.id === id;
	});

	done(null, user);
});

auth.configSession = function(app){
	app.use(passport.initialize());
	app.use(passport.session());
};

auth.authenticator = function(req, res, next){
	if (req.isAuthenticated()) {
		res.locals.user = req.user;
		next();
	}
	else {
		res.sendStatus(401);
	}
};

auth.router.route("/login")
	.get(function(req, res) {
		res.render("login");
	})
	.post(passport.authenticate('local'), function(req, res){
		res.json({status : 0});
	});

auth.router.get("/logout", function(req, res) {
	req.logout();
	res.status(200).json({});
});

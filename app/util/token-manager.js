var jwt = require("jwt-simple");
var Token = require("../model/token");
var User = require("../model/user");
var q = require("q");


var	secret = "theReviewsTK";
var livetimeout = 1000 * 60 * 60 * 24;

var manager = {};

manager.resolveTokenFromUser = function(user){
	var defer = q.defer();
	var uid = user._id;

	Token.findOne({
			"uid": uid
		}).exec()
		.then(function(token) {
			if (token) {
				token.createDate = new Date();

				token.save(function(error) {
					if (error) {
						console.log("token timestap refresh save fail for user" + uid);
					};
				})

				defer.resolve(token);
			} else {
				var tk = new Token({
					"uid": uid,
					jwtToken: jwt.encode({
						id: uid,
						iss: "xingyunzh.com"
					}, secret),
					createDate: new Date()
				});

				tk.save(function(error) {
					if (error) {
						defer.reject(error);
					}
					else {
						defer.resolve(tk)
					};
				});
			};
		})
		.catch(function(error) {
			console.log("token findOne fail for user" + uid);
			defer.reject(error);
		});

		return defer.promise;
}

manager.resolveUserFromToken = function(tks) {
	var defer = q.defer();

	var payload = jwt.decode(tks, secret);
	if (payload.id) {
		Token.findOne({uid : payload.id}).exec()
			.then(function(token){
				var now = new Date().getTime();
				var createTime = token.createDate.getTime();
				if (token === null || new Date().getTime() - token.createDate.getTime() > livetimeout) {
					defer.resolve(null);
					token.remove();
				}else {
					User.findById(token.uid).populate("coachProfile playerProfile").exec().then(function(user){
						defer.resolve(user);
					}, function error (argument) {
						defer.reject(argument);
					});
				};
			})
			.catch(function(error){
				defer.reject({error:"find error"});
			});
	}else {
		defer.reject({error:"param error"});
	};

	return defer.promise;
}

module.exports = manager;
var _ = require("lodash");
var util = require("../util/shared/util");

var User = require("../model/user");
var Coach = require("../model/coach");
var Player = require("../model/player");

function secureUserInfo(user){
	// user.password = null;
	return user;
}

exports.getAll = function(req, res) {
	User.find(function(err, allUsers) {
		if (err) {
			res.json(util.wrapBody(err, "E"));
		}
		else {
			_.map(allUsers, secureUserInfo);
			res.json(util.wrapBody(allUsers));
		}
	});
};

exports.getByEmail = function(req, res){
	var emailToSearch = req.params.email;

	User.find({email : emailToSearch}, function(err, user){
		if (err) {
			res.json(util.wrapBody(err, "E"));
		}
		else {
			secureUserInfo(user);
			res.json(util.wrapBody(user));
		}
	});
};

exports.getByUsername = function(req, res){
	var uname = req.params.username;

	User.findOne({username : uname}, function(err, user){
		if (err) {
			res.json(util.wrapBody(err, "E"));
		}
		else {
			secureUserInfo(user);
			res.json(util.wrapBody(user));
		}
	});
};

exports.getByKeyword = function (req, res) {
	var key = req.params.keyword;

	User.find({username:{$regex:key, $options:'i'}}, function (err, users) {
		 if (err) {
		 	res.json(util.wrapBody(err, "E"));
		 }else {
		 	_.map(users, secureUserInfo);
		 	res.json(util.wrapBody(users));
		 };
	});
}

exports.getById = function(req, res){
	var idToSearch = req.params.id;

	User.findById(idToSearch).populate('coachProfile').populate('playerProfile').exec(function(err, user){
		if (err) {
			res.json(util.wrapBody(err, "E"));
		}
		else {
			secureUserInfo(user);
			res.json(util.wrapBody(user));
		}
	});
};

exports.deleteById = function(req, res){
	var idToSearch = req.params.id;

	User.findByIdAndRemove(idToSearch, function(err, user){
		if (err) {
			res.json(util.wrapBody(err, "E"));
		}
		else {
			res.json(util.wrapBody(""));
		}
	});
};

exports.add = function(req, res){
	if(req.body.name && req.body.email && req.body.username && req.body.password){
		var success = "success";

		var user = new User({
			name  : req.body.name,
			sex : req.body.sex,
			birth : req.body.birth,
			colleage : req.body.colleage,
			major : req.body.major,
			lang : req.body.lang,
			email : req.body.email,
			tel : req.body.tel,
			address : req.body.address,
			username : req.body.username,
			password : req.body.password,
			joinDate : new Date(),
			graduatedDate : req.body.graduatedDate,
			githubAccount : req.body.githubAccount,

		}, function(err, data) {
			success = 'add fail - creation failure.'
		});

		if (req.body.roleName === "Coach") {
			var coachProfile = new Coach({
				careerStartDate: req.body.careerStartDate,
				company: req.body.company,
				skills: req.body.skills,
				description: req.body.description,
				linkedin: req.body.linkedin
			});

			coachProfile.save(function(error){
				if (error){
					success = 'coachProfile - save error' + error;
				};
			});

			user.coachProfile = coachProfile;
		}
		else if (req.body.roleName === "Player") {
			var playerProfile = new Player({
				colleageEnterDate: req.body.colleageEnterDate,
				colleageExitDate: req.body.colleageExitDate,
				interestArea: req.body.interestArea,
				interestRoles: req.body.interestRoles,
			});

			playerProfile.save(function(error){
				if (error){
					success = 'playerProfile - save error' + error;
				};
			});

			user.playerProfile = playerProfile;
		};

		if (success === "success") {
			user.save(function(error) {
				if (error) {
					success = 'add fail! - save err:' + error;

					user.playerProfile.remove();
					user.coachProfile.remove();
				};
			})
		};

		res.json(util.wrapBody({id:user._id}));
	}
	else {
		res.json(util.wrapBody("", "E"));
	}
};


exports.updateProfile = function (req, res) {
	var coach = null;
	var player = null;

	var updateContent = req.body.updateContent;
	var needsSave = false;

	var user = req.user;
	for (var key in updateContent) {
		if (key == "coachProfile") {
			for (var k in updateContent.coachProfile){
				user.coachProfile[k] = updateContent.coachProfile[k];
			};

			user.coachProfile.save(function (error) {
				 res.json(util.wrapBody(error, "E:save error"));
			});
		}
		else if (key == "playerProfile") {
			for (var k in updateContent.playerProfile){
				user.playerProfile[k] = updateContent.playerProfile[k];
			};

			user.playerProfile.save(function (error) {
				 res.json(util.wrapBody(error, "E:save error"));
			});
		}
		else if (key == "_id"){
			continue;
		}
		else {
			user[key] = updateContent[key];
			needsSave = true;
		}
	};

	if (needsSave) {
		user.save(function (error) {
			if (error) {
				res.json(util.wrapBody(error, "E:save error"));
			}else {
				res.json(util.wrapBody({userId:user._id}));
			};
		});

		return;
	} else {
		res.json(util.wrapBody({userId:user._id}));
	};
}
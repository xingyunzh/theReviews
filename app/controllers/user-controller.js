var _ = require("lodash");
var util = require("../util/shared/util");

var User = require("../model/user");
var Coach = require("../model/coach");
var Player = require("../model/player");

exports.getAll = function(req, res) {
	User.find(function(err, allUsers) {
		if (err) {
			res.sendStatus(404);
		} else {
			res.json(allUsers);
		}
	});
};

exports.getByEmail = function(req, res){
	var emailToSearch = req.params.email;

	User.find({email : emailToSearch}, function(err, user){
		if (err) {
			res.sendStatus(404);
		}
		else {
			res.json(user);
		}
	});
};

exports.getById = function(req, res){
	var idToSearch = req.params.id;

	User.findById(idToSearch).populate('coachProfile').populate('playerProfile').exec(function(err, user){
		if (err) {
			res.sendStatus(404);
		}
		else {
			res.json(user);
		}
	});
};

exports.deleteById = function(req, res){
	var idToSearch = req.params.id;

	User.findByIdAndRemove(idToSearch, function(err, user){
		if (err) {
			res.sendStatus(404);
		}
		else {
			res.json({stats:"success", body : {id : idToSearch}});
		}
	});
};

exports.add = function(req, res){
	if(req.body.name && req.body.email && req.body.username && req.body.password){
		var success = "success";

		var user = new User({
			name  : req.body.name,
			sex : req.body.sex,
			birth : util.convStringToDate(req.body.birth),
			colleage : req.body.colleage,
			major : req.body.major,
			lang : req.body.lang,
			email : req.body.email,
			tel : req.body.tel,
			address : req.body.address,
			username : req.body.username,
			password : req.body.password,
			joinDate : util.convStringToDate(req.body.joinDate),
			graduatedDate : util.convStringToDate(req.body.graduatedDate),
			githubAccount : req.body.githubAccount,

		}, function(err, data) {
			success = 'add fail - creation failure.'
		});

		if (req.body.roleName === "Coach") {
			var coachProfile = new Coach({
				careerStartDate: util.convStringToDate(req.body.careerStartDate),
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
				colleageEnterDate: util.convStringToDate(req.body.colleageEnterDate),
				colleageExitDate: util.convStringToDate(req.body.colleageExitDate),
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
				};
			})
		};

		res.json({status:success, body : { id : user._id}});
	}
	else {
		res.sendStatus(422);
	}
};

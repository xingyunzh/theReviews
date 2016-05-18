var _ = require("lodash");

var User = require("../model/user");

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

	User.findById(idToSearch, function(err, user){
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
			email : req.body.email,
			username : req.body.username,
			password : req.body.password

		}, function(err, data) {
			success = 'add fail - creation failure.'
		});

		user.save(function(error){
			if (error) {
				success = 'add fail! - save err:' + error;	
			};
		})

		res.json({status:success, body : { id : user._id}});
	}
	else {
		res.sendStatus(422);
	}
};

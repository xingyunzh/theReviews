var _ = require("lodash");
var moment = require("moment");

var Feedback = require("../model/feedback");

exports.getAll = function(req, res) {
	Feedback.find(function(err, allFeedbacks) {
		if (err) {
			res.sendStatus(404);
		} else {
			res.json(allFeedbacks);
		}
	});
};

exports.getAllTestview = function(req, res){
	Feedback.find(function(err, allFeedbacks) {
		res.render('feedback', {feedbacks : allFeedbacks});	
	});
};

exports.getByEmail = function(req, res){
	var emailToSearch = req.params.email;

	Feedback.find({email : emailToSearch}, function(err, feedback){
		if (err) {
			res.sendStatus(404);
		}
		else {
			res.json(feedback);
		}
	});
};

exports.getById = function(req, res){
	var idToSearch = req.params.id;

	Feedback.findById(idToSearch, function(err, feedback){
		if (err) {
			res.sendStatus(404);
		}
		else {
			res.json(feedback);
		}
	});
};

exports.deleteById = function(req, res){
	var idToSearch = req.params.id;

	Feedback.findByIdAndRemove(idToSearch, function(err, feedback){
		if (err) {
			res.sendStatus(404);
		}
		else {
			res.json({stats:"success", body : {id : idToSearch}});
		}
	});
};

exports.add = function(req, res){
	if(req.body.name && req.body.email && req.body.content){
		// var id = uuid.v4();
		var momt = moment();
		var success = "success";

		var feedback = new Feedback({
			name  : req.body.name,
			email : req.body.email,
			content  : req.body.content,
			moment : momt.format()
			// id : id
		}, function(err, data) {
			success = 'add fail - creation failure.'
		});


		feedback.save(function(error){
			if (error) {
				success = 'add fail! - save err:' + error;	
			};
		})
		// feedbackData.push(feedback);

		res.json({status:success, body : { id : feedback._id}});
	}
	else {
		res.sendStatus(422);
	}
};
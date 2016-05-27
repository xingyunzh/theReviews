var _ = require("lodash");
var util = require("../util/shared/util");

var Iteration = require("../model/iteration");
var ObjectId = require("mongoose").mongo.ObjectId;


exports.create = function (req, res) { 
	 var iteration = new Iteration({
	 	name : req.body.name,
	 	startDate : req.body.startDate,
	 	endDate:req.body.endDate,
	 	result:req.body.result,
	 	planEffort:req.body.planEffort,
	 	actualEffort:req.body.actualEffort,
	 	goal:req.body.goal,
	 	criteria:req.body.criteria
	 });

	 iteration.save(function (error) {
	 	 /* body... */ 
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, 'E'));
	 	 }
	 	 else {
	 	 	res.json(util.wrapBody({id:iteration._id}));
	 	 };
	 });
}

exports.getAll = function (req, res) {
	 /* body... */ 
	 Iteration.find().exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail(data) {
	 	 // body...  

	 	 res.json(util.wrapBody(data, "E"));
	 });
} 

exports.getById = function(req, res) {
	 // body...  
	 Iteration.findById(req.params.id).exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail (error) {
	 	 // body...  
	 	 res.json(util.wrapBody(error, 'E'));
	 })
}

exports.getByName = function (req, res) {
	 /* body... */ 
	 Iteration.find({name:req.params.name}).exec().then(function success(argument) {
	 	 /* body... */ 
	 	 res.json(util.wrapBody(argument));
	 }, function fail(argument) {
	 	 // body...  
	 	 res.json(util.wrapBody(argument, "E"));
	 });
}

exports.updateById = function (req, res) {
	 /* body... */ 
	 var updateContent = req.body.updateContent;

	 Iteration.findByIdAndUpdate(req.params.id, updateContent,{"new" : true}).exec().then(function success(argument) {
	 	 res.json(util.wrapBody(argument));
	 }, function fail(argument) {
	 	 res.json(util.wrapBody(argument, "E"));
	 });
}

exports.deleteById = function (req, res) {
	 Iteration.findByIdAndRemove(req.params.id, function (error, data) {
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, "E"));
	 	 }else {
	 	 	res.json(util.wrapBody(data));
	 	 };
	 })
}



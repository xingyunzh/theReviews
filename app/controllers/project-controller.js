var _ = require("lodash");
var util = require("../util/shared/util");

var Project = require("../model/project");
var ObjectId = require("mongoose").mongo.ObjectId;

exports.create = function (req, res) { 
	 var project = new Project({
	 	name : req.body.name,
	 	description : req.body.description,
	 	createDate : new Date(),
	 	endDate : req.body.endDate,

	 	phase : Project.Phase.Initial,
	 	state : Project.State.Active,

	 	owner : req.user,
	 	team : ObjectId(req.body.team),
	 	productOwner : ObjectId(req.body.productOwner),
	 	stakehoders : _.map(req.body.stakehoders, function (stakeholderId) {
	 		 return ObjectId(stakeholderId);
	 	}),

	 	reviews:_.map(req.body.reviews, function (argument) {
	 		 return ObjectId(argument);
	 	}),

	 	changeRequests : _.map(req.body.changeRequests, function (argument) {
	 		 return ObjectId(argument); 
	 	}),

	 	iterations: _.map(req.body.iterations, function (argument) {
	 		 return ObjectId(argument);
	 	})
	 });

	 project.save(function (error) {
	 	 /* body... */ 
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, 'E'));
	 	 }
	 	 else {
	 	 	res.json(util.wrapBody({id:project._id}));
	 	 };
	 });
}

exports.getAll = function (req, res) {
	 /* body... */ 
	 Project.find().exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail(data) {
	 	 // body...  

	 	 res.json(util.wrapBody(data, "E"));
	 });
} 

exports.getById = function(req, res) {
	 // body...  
	 Project.findById(req.params.id).populate("owner team productOwner stakeholders reviews changeRequests iterations").exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail (error) {
	 	 // body...  
	 	 res.json(util.wrapBody(error, 'E'));
	 })
}

exports.getByName = function (req, res) {
	 /* body... */ 
	 Project.find({name:req.params.name}).populate("owner team productOwner stakeholders reviews changeRequests iterations").exec().then(function success(argument) {
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

	 Project.findByIdAndUpdate(req.params.id, updateContent,{"new" : true}).exec().then(function success(argument) {
	 	 res.json(util.wrapBody(argument));
	 }, function fail(argument) {
	 	 res.json(util.wrapBody(argument, "E"));
	 });
}

exports.deleteById = function (req, res) {
	 Project.findByIdAndRemove(req.params.id, function (error, data) {
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, "E"));
	 	 }else {
	 	 	res.json(util.wrapBody(data));
	 	 };
	 })
}



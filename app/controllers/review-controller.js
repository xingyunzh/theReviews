var _ = require("lodash");
var util = require("../util/shared/util");

var Review = require("../model/review");
var ObjectId = require("mongoose").mongo.ObjectId;


exports.create = function (req, res) { 
	 var review = new Review({
	 	name : req.body.name,
	 	owner : req.body.owner == null ? ObjectId(req.user._id) : ObjectId(req.body.owner),

	 	reviewers :  _.map(req.body.reviewers, function (memberId) {
	 		 return ObjectId(memberId);
	 	}),

	 	approvers:  _.map(req.body.approvers, function (memberId) {
	 		 return ObjectId(memberId);
	 	}),

	 	mediator : ObjectId(req.body.mediator),

	 	observers :  _.map(req.body.observers, function (memberId) {
	 		 return ObjectId(memberId);
	 	}),

	 	gitURL : req.body.gitURL,
	 	docURL : req.body.docURL,

	 	createDate : new Date(),
	 	startDate : req.body.startDate,
	 	dueDate : req.body.dueDate,
	 	meetings : req.body.meetings,

	 	state : req.body.state,
	 	contentType : req.body.contentType,
	 });

	 review.save(function (error) {
	 	 /* body... */ 
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, 'E'));
	 	 }
	 	 else {
	 	 	res.json(util.wrapBody({id:review._id}));
	 	 };
	 });
}

exports.getAll = function (req, res) {
	 /* body... */ 
	 Review.find().exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail(data) {
	 	 // body...  

	 	 res.json(util.wrapBody(data, "E"));
	 });
} 

exports.getById = function(req, res) {
	 // body...  
	 Review.findById(req.params.id).populate("reviewers approvers mediator observers owner").exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail (error) {
	 	 // body...  
	 	 res.json(util.wrapBody(error, 'E'));
	 })
}

exports.getByName = function (req, res) {
	 /* body... */ 
	 Review.find({name:req.params.name}).populate("reviewers approvers mediator observers owner").exec().then(function success(argument) {
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

	 Review.findByIdAndUpdate(req.params.id, updateContent,{"new" : true}).exec().then(function success(argument) {
	 	 res.json(util.wrapBody(argument));
	 }, function fail(argument) {
	 	 res.json(util.wrapBody(argument, "E"));
	 });
}

exports.deleteById = function (req, res) {
	 Review.findByIdAndRemove(req.params.id, function (error, data) {
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, "E"));
	 	 }else {
	 	 	res.json(util.wrapBody(data));
	 	 };
	 })
}

exports.getStateMapping = function (req, res) {
	res.json(util.wrapBody(Review.schema.statics.State));
}

exports.getContentTypeMapping = function (req, res) {
	 res.json(util.wrapBody(Review.schema.statics.ContentType));
}
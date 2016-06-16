var _ = require("lodash");
var util = require("../util/shared/util");

var ChangeRequest = require("../model/change-request");
var ObjectId = require("mongoose").mongo.ObjectId;

exports.create = function (req, res) { 
	 var changeRequest = new ChangeRequest({
	 	name : req.body.name,
	 	description : req.body.description,
	 	impact:req.body.impact,
	 	createDate : new Date(),
	 	dueDate : req.body.dueDate,
	 	owner : req.body.owner == null ? ObjectId(req.user._id) : ObjectId(req.body.owner),
	 	
	 	reviews : _.map(req.body.reviews, function (memberId) {
	 		 return ObjectId(memberId);
	 	}),
	 });

	 changeRequest.save(function (error) {
	 	 /* body... */ 
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, 'E'));
	 	 }
	 	 else {
	 	 	res.json(util.wrapBody({id:changeRequest._id}));
	 	 };
	 });
}

exports.getAll = function (req, res) {
	 /* body... */ 
	 ChangeRequest.find().exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail(data) {
	 	 // body...  

	 	 res.json(util.wrapBody(data, "E"));
	 });
} 

exports.getById = function(req, res) {
	 // body...  
	 ChangeRequest.findById(req.params.id).populate("members coaches leader").exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail (error) {
	 	 // body...  
	 	 res.json(util.wrapBody(error, 'E'));
	 })
}

exports.getByName = function (req, res) {
	 /* body... */ 
	 ChangeRequest.find({name:req.params.name}).populate("members coaches leader").exec().then(function success(argument) {
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

	 ChangeRequest.findByIdAndUpdate(req.params.id, updateContent,{"new" : true}).exec().then(function success(argument) {
	 	 res.json(util.wrapBody(argument));
	 }, function fail(argument) {
	 	 res.json(util.wrapBody(argument, "E"));
	 });
}

exports.deleteById = function (req, res) {
	 ChangeRequest.findByIdAndRemove(req.params.id, function (error, data) {
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, "E"));
	 	 }else {
	 	 	res.json(util.wrapBody(data));
	 	 };
	 })
}
var _ = require("lodash");
var util = require("../util/shared/util");

var Team = require("../model/team");
var ObjectId = require("mongoose").mongo.ObjectId;

// [{user:"dkkiigh398", role:"Developer"}] to [{user:ObjectId(dkkiigh398), role:"Developer"}]
function fitMembersToSchema(members) {
	return _.map(members, function(m) {
		if (m.user instanceof String) {
			return {
				user: ObjectId(m.user),
				role: m.role
			};

		} else {
			return m;
		};
	});
}

function fitCoachesToSchema (coaches) {
	 return _.map(coaches, function (c) {
	 	 if (c instanceof String) {
	 	 	return ObjectId(c);
	 	 }else {
	 	 	return c;
	 	 };
	 });
}

exports.create = function (req, res) { 
	 var team = new Team({
	 	name : req.body.name,
	 	description : req.body.description,
	 	setupDate : new Date(),
	 	leader : req.user,
	 	
	 	members : fitMembersToSchema(req.body.members),
	 	coaches : fitCoachesToSchema(req.body.coaches)
	 });

	 team.save(function (error) {
	 	 /* body... */ 
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, 'E'));
	 	 }
	 	 else {
	 	 	res.json(util.wrapBody({id:team._id}));
	 	 };
	 });
}

exports.getAll = function (req, res) {
	 /* body... */ 
	 Team.find().populate("members.user coaches").exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail(data) {
	 	 // body...  

	 	 res.json(util.wrapBody(data, "E"));
	 });
} 

exports.getById = function(req, res) {
	 // body...  
	 Team.findById(req.params.id).populate("members coaches leader").exec().then(function success(data) {
	 	 // body...  
	 	 res.json(util.wrapBody(data));
	 }, function fail (error) {
	 	 // body...  
	 	 res.json(util.wrapBody(error, 'E'));
	 })
}

exports.getByName = function (req, res) {
	 /* body... */ 
	 Team.find({name:req.params.name}).populate("members coaches leader").exec().then(function success(argument) {
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
	 if (updateContent.members) {
	 	updateContent.members = fitMembersToSchema(updateContent.members);
	 };
	 
	 if (updateContent.coaches) {
	 	updateContent.coaches = fitCoachesToSchema(updateContent.coaches);
	 };

	 Team.findByIdAndUpdate(req.params.id, updateContent,{"new" : true}).exec().then(function success(argument) {
	 	 res.json(util.wrapBody(argument));
	 }, function fail(argument) {
	 	 res.json(util.wrapBody(argument, "E"));
	 });
}

exports.deleteById = function (req, res) {
	 Team.findByIdAndRemove(req.params.id, function (error, data) {
	 	 if (error) {
	 	 	res.json(util.wrapBody(error, "E"));
	 	 }else {
	 	 	res.json(util.wrapBody(data));
	 	 };
	 })
}
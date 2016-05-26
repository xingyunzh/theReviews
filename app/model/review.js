var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var util = require("../util/shared/util");

var ReviewSchema = new Schema({
	owner : {type:Schema.Types.ObjectId, ref:"User"},
	reviewers : [{type:Schema.Types.ObjectId, ref"User"}],
	approvers : [{type:Schema.Types.ObjectId, ref"User"}],
	mediator : {type:Schema.Types.ObjectId, ref"User"},
	observers : [{type:Schema.Types.ObjectId, ref"User"}],

	gitURL : String,
	docURL : String,

	createDate : Date,
	startDate : Date,
	dueDate : Date,
	meetings:[{date:Date, effort:Number}],  //effort: man hours

	state : Number,  //should be one of the ReviewState attributes Initial, Ongoing, ....
	contentType:Number,
});



module.exports = mongoose.model('Review', ReviewSchema);

//Facilitator Types

var State = {
	Initial : 0,
	Ongoing : 1,
	Approved : 2,
	ApprovedWithComments : 3
	Rejected : 4,
	Cancelled : 5,
};

var ContentType = {
	Code:0,
	Requirement:1,
	PrjectPlan:2,
	Architecture:3,
	SprintPlan:4,
	SprintReview:5,
	Restrospective:6,
	ChangeRequest:7,
	TestPlan:8,
	TestCase:9,
	Other:10
}

ReviewSchema.statics.State = State;
ReviewSchema.statics.ContentType = ContentType;

//Facilitator Methods

State.isDefinedState = util.isDefinedEnumMethod;
State.stringFromState = util.stringFromEnumMethod;

ContentType.isDefinedType = util.isDefinedEnumMethod;
ContentType.stringFromType = util.stringFromEnumMethod; 
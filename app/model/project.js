var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var util = require("../util/shared/util");

var ProjectSchema = new Schema({
	owner:{type:Schema.Types.ObjectId, ref:"User"},
	team : {type:Schema.Types.ObjectId, ref:"Team"},
	productOwner: {type:Schema.Types.ObjectId, ref:"User"},
	stakehoders:[{type:Schema.Types.ObjectId, ref:"User"}],   //TBD to be redesigned here

	reviews:[{type:Schema.Types.ObjectId, ref:"Review"}],
	changeRequests:[{type:Schema.Types.ObjectId, ref:"ChangeRequest"}],

	name : String,
	description : String,
	createDate : Date,
	endDate: Date,

	phase:Number,
	state:Number,

	iterations:[{type:Schema.Types.ObjectId, ref:"Iteration"}]
});

module.exports = mongoose.model('Project', ProjectSchema);

// Internal Types
var Phase = {
	Initial:0,
	RequirementAnalysis:1,
	ArchitectureDefine:2,
	ProjectPlan:3,
	IterationX:4,
	End:5
}

var State = {
	Active:0,
	InActive:1,
}

ProjectSchema.statics.Phase = Phase;
ProjectSchema.statics.State = State;

//methods
ProjectSchema.statics.isDefinedPhase = util.isDefinedEnumMethod;
ProjectSchema.statics.stringFromPhase = util.stringFromEnumMethod;

ProjectSchema.statics.isDefinedState = util.isDefinedEnumMethod;
ProjectSchema.statics.stringFromState = util.stringFromEnumMethod;
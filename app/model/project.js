var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var util = require("../util/shared/util");

var ProjectSchema = new Schema({
	owner:{type:Schema.Types.ObjectId, ref:"User"},
	team : {type:Schema.Types.ObjectId, ref:"Team"},
	productOwner: {type:Schema.Types.ObjectId, ref:"User"},
	stakehoders:[{type:Schema.Types.ObjectId, ref:"User"}],

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

//Internal Types
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
Phase.isDefinedPhase = util.isDefinedEnumMethod;
Phase.stringFromPhase = util.stringFromEnumMethod;

State.isDefinedState = util.isDefinedEnumMethod;
State.stringFromState = util.stringFromEnumMethod;
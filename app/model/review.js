var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ReviewState = {
	Initial : 0,
	Ongoing : 1,
	Approved : 2,
	ApprovedWithComments : 3
	Rejected : 4,
	Cancelled : 5,
	
	isDefinedState : function(st) {
		if (isNaN(st)) {
			return false;
		}
		else {
			for (var key in this) {
				if (!isNaN(this[key]) && st === this[key]) {
					return true;
				};
			}
		}

		return false;
	}

};

var ReviewSchema = new Schema({
	ownerTeam : {type:Schema.Types.ObjectId, ref:"Team"},
	reviewers : [{type:Schema.Types.ObjectId, ref"User"}],
	approvers : [{type:Schema.Types.ObjectId, ref"User"}],
	mediator : {type:Schema.Types.ObjectId, ref"User"},
	observers : [{type:Schema.Types.ObjectId, ref"User"}],

	gitURL : String,
	docURL : String,

	createDate : Date,
	startDate : Date,
	dueDate : Date,
	state : Number,  //should be one of the ReviewState attributes Initial, Ongoing, ....
});

module.exports = mongoose.model('Review', ReviewSchema);
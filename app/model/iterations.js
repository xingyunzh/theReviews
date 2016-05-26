var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var IterationSchema = new Schema({
	name : String,
	startDate : Date,
	endDate : Date,
	result : Boolean,
	planEffort:Number,
	actualEffort:Number,

	goal:String,
	criteria:String
});

module.exports = mongoose.model('Iteration', IterationSchema);
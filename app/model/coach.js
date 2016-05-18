var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CoachSchema = new Schema({
	careerStartDate : Date,
	company : String,
	skills : String,
	description : String,
	linkedin : String
});

module.exports = mongoose.model('Coach', CoachSchema);
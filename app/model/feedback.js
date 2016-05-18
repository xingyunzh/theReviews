var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FeedbackSchema = new Schema({
	name : String,
	email : String,
	content : String,
	moment : String
});

module.exports = mongoose.model('Feedback', FeedbackSchema);
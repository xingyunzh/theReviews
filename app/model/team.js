var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	members : [{
		user: {type:Schema.Types.ObjectId, ref:"User"},
		role: String
	}],
	
	coaches : [{type:Schema.Types.ObjectId, ref:"User"}],

	leader: {type:Schema.Types.ObjectId, ref:"User"},

	name : String,
	description : String,
	setupDate : Date
});

module.exports = mongoose.model('Team', TeamSchema);
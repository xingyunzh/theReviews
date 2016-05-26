var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	members : [{type:Schema.Types.ObjectId, ref:"User"}],
	coaches : [{type:Schema.Types.ObjectId, ref:"User"}],

	leader: {type:Schema.Types.ObjectId, ref:"User"},

	name : String,
	description : String,
	setupDate : Date
});

module.exports = mongoose.model('Team', TeamSchema);
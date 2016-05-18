var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TeamSchema = new Schema({
	members : [{type:Schema.Types.ObjectId, ref:"user"}],
	coaches : [{type:Schema.Types.ObjectId, ref:"user"}],
	description : String,
	setupDate : Date
});

module.exports = mongoose.model('Team', TeamSchema);
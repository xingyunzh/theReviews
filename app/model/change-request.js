var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChangeRequestSchema = new Schema({
	reviews:[{type:Schema.Types.ObjectId, ref:"Review"}],
	owner:{type:Schema.Types.ObjectId, ref:"User"},
	
	name:String,
	description : String,
	impact:String,

	createDate : Date,
	dueDate:Date,
});

module.exports = mongoose.model('ChangeRequest', ChangeRequestSchema);
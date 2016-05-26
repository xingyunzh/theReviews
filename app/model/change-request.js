var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ChangeRequestSchema = new Schema({
	reviews:[{type:Schema.Types.ObjectId, ref:"Review"}],
	
	description : String,
	impact:String,

	createDate : Date,
	dueDate:Date,
});

module.exports = mongoose.model('ChangeRequest', ChangeRequestSchema);
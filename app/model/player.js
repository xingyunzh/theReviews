var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlayerSchema = new Schema({
	colleageEnterDate : Date,
	colleageExitDate: Date,
	interestArea : String,
	interestRoles : [String]
});

module.exports = mongoose.model('Player', PlayerSchema);
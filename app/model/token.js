var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TokenSchema = new Schema({
	uid : String,
	jwtToken : String,
	createDate : Date
});

module.exports = mongoose.model('Token', TokenSchema);
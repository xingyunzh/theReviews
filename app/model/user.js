var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	name : String,
	sex : {type:String, 'default':"male"},
	birth : {type:Date, 'default': Date.now()},
	colleage : String,
	major : String,
	lang : String,
	email : String,
	tel : String,
	address : String,
	username : String,
	password : {type:String, 'default': "123456"},
	joinDate : {type:Date, 'default': Date.now()},
	graduatedDate : Date,
	githubAccount : String,
	isAdmin : {type:Boolean, 'default':false},

	coachProfile:{type:Schema.Types.ObjectId, ref:"Coach"},
	playerProfile:{type:Schema.Types.ObjectId, ref:"Player"}
});


UserSchema.methods.isCoach = function(){
	if (this.coachProfile) {
		return true;
	}
	else {
		return false;
	}
}

UserSchema.methods.isPlayer = function(){
	if (this.playerProfile) {
		return true;
	}
	else {
		return false;
	}
}



module.exports = mongoose.model('User', UserSchema);
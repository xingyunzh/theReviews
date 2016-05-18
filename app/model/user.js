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

	roles : [{
		roleName : String,
		roleProfile : {type:Schema.Types.ObjectId}
	}]
});

UserSchema.methods.isRoleOf = function(aRole) {
		for (var role in this.roles) {
		if (role.roleName === aRole) {
			return true;
		};
	}

	return false;
}

UserSchema.methods.isCoach = function(){
	return this.isRoleOf("Coach");
}

UserSchema.methods.isPlayer = function(){
	return this.isRoleOf("Player");
}



module.exports = mongoose.model('User', UserSchema);
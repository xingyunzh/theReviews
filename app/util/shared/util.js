;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.util = factory()
}(this, function () { 
	var util = {};

	util.convDateToString = function(date){
		if (date instanceof Date) {
			return date.getTime().toString();
		};

		return null;
	};

	util.convStringToDate = function(dateString){
		var date= new Date();
		date.setTime(Number(dateString));
		return date;
	};

		//convenient methods to contruct uniformat response
	util.wrapBody = function(obj, statusCode){
		var statusCode = arguments[1] ? arguments[1] : 'S';
		var wrapper = {
			status: statusCode,
			body : obj
		};

		return wrapper;
	};

	return util;
}));
;(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    global.moment = factory()
}(this, function () { 
	var util = {};

	util.convDateToString = function(date){
		if (date isinstanceof Date) {
			return date.getTime().toString();
		};

		return null;
	};

	util.convStringToDate = function(dateString){
		var date= new Date();
		date.setTime(Number(dateString));
		return date;
	};

}));
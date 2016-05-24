app.service('userService', ["$http", "$q", function ($http, $q) {
	
	this.getUserById = function(uid){
		var req = {
			method:"GET",
			url:"/api/user/getbyid/" + uid,
			headers:{
				"Content-Type":"application/json"
			}
		}	

		var deferred = $q.defer();
		$http(req).then(function success(response){
			var data = response.data;
			var user = data.body;

			if (user) {
				deferred.resolve(user);
			}
			else {
				deferred.reject("NotFound");
			};

		}, function fail(response){
			deferred.reject(response.statusText);
		});	

		return deferred.promise;
	}
	
}]);
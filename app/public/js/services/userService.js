app.service('userService', ["$http", "$q", function ($http, $q) {
	this.getCurrentUser = function(token){
		
		var deferred = $q.defer();
		$http({
			method:"GET",
			url:"/auth/myself",
			headers:{
				"Content-Type":"application/json",
				"x-access-token":token
			}
		}).then(function success(argument) {
		   var data = argument.data;
		   var user = data.body;
		   
		   deferred.resolve(user);
		}, function error(argument) {
			deferred.reject(argument.statusText);
		});

		return deferred.promise;
	};


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
			deferred.resolve(user);

		}, function fail(response){
			deferred.reject(response.statusText);
		});	

		return deferred.promise;
	};
	
	this.getUserByUsername = function(username){
		var req = {
			method : "GET",
			url:"/api/user/getbyusername/" + username,
			headers : {
				"Content-Type":"application/json"
			}
		}

		var deferred = $q.defer();
		$http(req).then(function success(response){
			var data = response.data;
			var user = data.body;

			deferred.resolve(user);
		}, function fail(response) {
			deferred.reject(response.statusText);
		});

		return deferred.promise;
	};

	this.addUser = function (userdata) {
		 var req = {
		 	method : "POST",
		 	url : "/api/user/add",
		 	headers:{
		 		"Content-Type" : "application/json"
		 	},
		 	data: userdata
		 }

		 var deferred = $q.defer();
		 $http(req).then(function success(response) {
		 	if (response.data.status === 'S') {
		 		deferred.resolve(response.data.body);
		 	} else{
		 		deferred.reject(response.data.status);
		 	};

		 }, function fail(response) {
		 	 deferred.reject(response.statusText);
		 });

		 return deferred.promise;
	};

	this.updateProfile = function (userdata, token) {
		 var req = {
		 	method : "POST",
		 	url : "/api/user/updateprofile",
		 	headers:{
		 		"Content-Type":"application/json",
		 		"x-access-token":token
		 	},
		 	data:{updateContent:userdata}
		 }

		 var deferred = $q.defer();
		 $http(req).then(function success (response) {
		 	 if (response.data.status === 'S') {
		 	 	deferrd.resolve(response.data.body);
		 	 }else {
		 	 	deferred.reject(response.data.status);
		 	 };
		 }, function fail (response) {
		 	 deferred.reject(response.statusText);
		 });

		 return deferred.promise;
	}


}]);
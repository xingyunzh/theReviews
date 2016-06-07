app.service("loginService", function($http, $q){
	this.login = function(username, password){
		var deferred = $q.defer();

		var req = {
			method: "POST",
			url:"/auth/login",
			headers:{
				"Content-Type":'application/json'
			},
			data:{
				"username":username,
				"password":password
			}
		}

		$http(req).then(function success(response){
			var body = response.data.body;
			if (response.data.status === 'S' && body.token) {
				deferred.resolve(body);
			}else {
				deferred.reject(response.data.status);
			}
		}, 
		function error(response){
			deferred.reject(response.statusText);
		});

		return deferred.promise;
	}

});

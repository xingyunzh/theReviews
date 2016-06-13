app.service('reviewService', function (httpHelper, $q) {

	this.createReview = function(review) {
		/* body... */
		return httpHelper.sendRequest("POST", "/api/review/create", review);
	};



	this.getStateMapping = function(argument) {
		var deferred = $q.defer();
		if (this.stateMapping) {
			
			setTimeout(function(){
				 deferred.resolve(this.stateMapping);
			}, 0);
			
		}else {
			httpHelper.sendRequest('GET', '/api/review/getstatemapping').then(function success(mapping) {
				 this.stateMapping = mapping;
				 deferred.resolve(mapping);
			}, function fail(argument) {
				 deferred.reject(argument); 
			});
		};

		return deferred.promise;
	};

	this.getContentTypeMapping = function (argument) {
		 var deferred = $q.defer();
		 if (this.contentTypeMapping) {
		 	setTimeout(function () {
		 		 deferred.resolve(this.contentTypeMapping);
		 	}, 0);
		 }else {
		 	httpHelper.sendRequest('GET', '/api/review/getcontenttypemapping').then(function success(argument) {
		 		 this.contentTypeMapping = argument;
		 		 deferred.resolve(argument);
		 	}, function fail (argument) {
		 		 deferred.reject(argument); 
		 	});
		 };

		 return deferred.promise;
	}

	this.deleteReview = function (review) {
		 return httpHelper.sendRequest('GET', '/api/review/deletebyid/' + review._id);
	};
});

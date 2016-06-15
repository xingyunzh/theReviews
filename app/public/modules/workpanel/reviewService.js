app.service('reviewService', function (httpHelper, $q, $uibModal) {

	this.createReview = function(review) {
		/* body... */
		return httpHelper.sendRequest("POST", "/api/review/create", review);
	};


	this.updateReviewById = function (reviewId, content) {
		 return httpHelper.sendRequest("POST", "/api/review/updatebyid/"+reviewId, {updateContent:content});
	}

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

	this.reviewPanelModalStep = function (aTitle, aReview){
		var deferred = $q.defer();
		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: "/modules/workpanel/review-panel.html",
			controller: "reviewPanelController",
			size: "lg",
			resolve: {
				title: function() {
					return aTitle;
				},
				review: function() {
					return aReview;
				}
			}
		});

		modalInstance.result.then(function ok(reviewId) {
			deferred.resolve(reviewId);
		}, function cancel(argument) {
			deferred.reject("cancel");
		});

		return deferred.promise;
	}
});

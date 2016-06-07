var kConfirmationHTML = "modules/common/confirmation.html";
var kConfirmationController = 'commonConfirmationController';

app.controller(kConfirmationController, function ($scope, $uibModalInstance, title, content) {
	$scope.title = title;
	$scope.content = content;

	$scope.ok = function () {
		 /* body... */ 
		 $uibModalInstance.close();
	};

	$scope.cancel = function () {
		 /* body... */ 
		 $uibModalInstance.dismiss("cancel");
	};
});

app.service('httpHelper', function ($http, $q, $rootScope) {
	this.sendRequest = function(method, url, data) {
		var req = {
			"method": method,
			"url": url,
			headers: {
				"Content-Type": "application/json",
				"x-access-token" : $rootScope.token
			},
			"data": data
		};

		var deferred = $q.defer();
		$http(req).then(function success(argument) {
			if (argument.data.status == "S") {
				deferred.resolve(argument.data.body);
			} else {
				deferred.reject(argument.data.status);
			};
		}, function fail(argument) {
			deferred.reject(argument.statusText);
		});

		return deferred.promise;
	};

});
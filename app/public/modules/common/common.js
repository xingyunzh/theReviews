var kConfirmationHTML = "modules/common/confirmation.html";
var kModalInputTextHTML = "modules/common/modal-text-input.html";
var kModalUserInputHTML = "modules/common/modal-user-input.html";
var kConfirmationController = 'commonModalController';
var kUserModalSuggestionController = 'userModalSuggestionController'

app.controller(kConfirmationController, function ($scope, $uibModalInstance, title, content) {
	$scope.title = title;
	$scope.modal = {};
	$scope.modal.content = content;

	$scope.ok = function () {
		 /* body... */ 
		 $uibModalInstance.close($scope.modal.content);
	};

	$scope.cancel = function () {
		 /* body... */ 
		 $uibModalInstance.dismiss("cancel");
	};
});

app.controller(kUserModalSuggestionController, function ($scope, $uibModalInstance, title, userService) {
	 $scope.title = title;
	 $scope.getSuggestUsers = function(keyword) {
	 	 return userService.getByKeyword(keyword);
	 }

	$scope.ok = function () {
		 /* body... */ 
		 $uibModalInstance.close($scope.modal.user);
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

app.service('util', function ($q, $uibModal) {
	this.indexOfObject = function (array, object, equlFunc) {
		 var i = 0;
		 for (i = array.length - 1; i >= 0; i--) {
		 	if (equlFunc(array[i], object)) {
		 		return i;
		 	};
		 };

		 return -1;
	};

	this.keyForValue = function (obj, value) {
		for(key in obj){
			if (obj[key] === value) {
				return key;
			};
		}

		return null;
	};

	this.confirmationStep = function(aTitle, aConent) {
		var deferred = $q.defer();

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: kConfirmationHTML,
			controller: kConfirmationController,
			size: "sm",
			resolve: {
				title: function() {
					return aTitle;
				},
				content: function() {
					return aConent;
				}
			}
		});

		modalInstance.result.then(function ok() {
			deferred.resolve("ok");
		}, function cancel(argument) {
			deferred.reject("cancel");
		});

		return deferred.promise;
	};

	this.modalTextInputStep = function (aTitle, aConent) {
		var deferred = $q.defer();

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: kModalInputTextHTML,
			controller: kConfirmationController,
			size: "lg",
			resolve: {
				title: function() {
					return aTitle;
				},
				content: function() {
					return aConent;
				}
			}
		});

		modalInstance.result.then(function ok(content) {
			deferred.resolve(content);
		}, function cancel(argument) {
			deferred.reject("cancel");
		});

		return deferred.promise; 
	};

	this.modalUserInputStep = function (aTitle) {
		var deferred = $q.defer();

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: kModalUserInputHTML,
			controller: kUserModalSuggestionController,
			size: "sm",
			resolve: {
				title: function() {
					return aTitle;
				},
			}
		});

		modalInstance.result.then(function ok(user) {
			deferred.resolve(user);
		}, function cancel(argument) {
			deferred.reject("cancel");
		});

		return deferred.promise; 		 
	}
});

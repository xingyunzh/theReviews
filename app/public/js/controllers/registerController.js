app.controller("registerController", function($rootScope, $scope, $q, userService) {
	$scope.formdata = {sex:"male", birth:new Date("1990-10-01"), graduatedDate:new Date("2001-07-01")};
	$scope.validationResult = null;

	var kUsernameValidationSuccessText = "The username is OK to use.";
	var kUsernameValidationFailText =  "The username is already used.";
	var kUsernameValidationEmptyText = "Please fill the username.";

	var usernameToValidate = null;

	function contentValidate(argument) {
		 if ($scope.formdata.username == null || $scope.formdata.username != usernameToValidate || $scope.validationResult != kUsernameValidationSuccessText) {
		 	return "Please ensure username is unique by clicking the validate button";
		 }; 

		 if ($scope.formdata.password == null || $scope.formdata.password.length < 6 || $scope.formdata.password !== $scope.formdata.cpassword) {
		 	return "Please set your password and confirm. Password should be no shorter than 6 letters."
		 };

		 if ($scope.formdata.name == null) {
		 	return "Please set your name."
		 };

		 if ($scope.formdata.colleage == null) {
		 	return "Please set your colleage."
		 };

		 if ($scope.formdata.email == null) {
		 	return "Please set your email correctly.";
		 };

		 if ($scope.formdata.tel == null || $scope.formdata.tel.length < 8) {
		 	return "Please set your tel number correctly";
		 };

		 return null;
	}

	$scope.register = function() {
		var validateMessage = contentValidate();
		if (validateMessage) {
			toastr.error(validateMessage, "Not Completed", {timeOut:0, closeButton:true});
			return;
		}

		userService.addUser($scope.formdata).then(function success(data) {
			 $rootScope.$state.go("nav.main");  
		}, function fail(argument) {
			  toastr.error("Register error. Please try it again later.", "System Error", {timeOut:5});
		})
	}

	$scope.validateUsername=function() {
		usernameToValidate = $scope.formdata.username;

		if (usernameToValidate == null || usernameToValidate.length < 1) {
			$scope.validationResult = kUsernameValidationEmptyText;

			return; 
		};

		var deferred = $q.defer();
		userService.getUserByUsername(usernameToValidate).then(function success(user) {
			if (user) {
				$scope.validationResult = kUsernameValidationFailText;
			} else{
				$scope.validationResult = kUsernameValidationSuccessText;
			};  
		}, function fail(argument) {
			 	$scope.validationResult = null;
		})
	}

});
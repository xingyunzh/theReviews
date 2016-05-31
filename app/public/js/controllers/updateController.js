app.controller("updateController", function($rootScope, $scope, $q, userService) {
	$scope.formdata = $rootScope.user;

	function contentValidate(argument) {

		 if ($scope.formdata.password == null || $scope.formdata.password.length < 6 || $scope.formdata.password !== $scope.cpassword) {
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

	$scope.updateProfile = function() {
		var validateMessage = contentValidate();
		if (validateMessage) {
			toastr.error(validateMessage, "Not Completed", {timeOut:0, closeButton:true});
			return;
		}

		userService.updateProfile($scope.formdata, $rootScope.token).then(function success(data) {
			 $rootScope.$state.go("main");  
		}, function fail(argument) {
			  toastr.error("Update profile error. Please try it again later.", "System Error", {timeOut:5});
		})
	}

});
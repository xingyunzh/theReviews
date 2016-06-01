app.controller("updateController", function($rootScope, $scope, $q, userService) {
	$scope.formdata = $rootScope.user;

	function contentValidate(argument) {

		 if ($scope.formdata.password == null || $scope.formdata.password.length < 6 || $scope.formdata.password !== $scope.cpassword) {
		 	return "请设置你的密码并确认，密码为数不得少于6位"
		 };

		 if ($scope.formdata.name == null) {
		 	return "请设置你的姓名"
		 };

		 if ($scope.formdata.colleage == null) {
		 	return "请填写你的院校"
		 };

		 if ($scope.formdata.email == null) {
		 	return "请填写正确的电子邮箱地址";
		 };

		 if ($scope.formdata.tel == null || $scope.formdata.tel.length < 8) {
		 	return "请填写正确的电话号码";
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
			  toastr.error("注册错误， 请稍后再试！", "系统错误", {timeOut:5});
		});
	}

});
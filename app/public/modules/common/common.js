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
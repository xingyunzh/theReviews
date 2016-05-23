var app = angular.module("app", ["ui.router"])
.run(['$rootScope', '$state', '$stateParams', function($roootScope, $state, $stateParams) {
	$roootScope.$state = $state;
	$roootScope.$stateParams = $stateParams; 

	// $state.go("main.aboutus");
}]);


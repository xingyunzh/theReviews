var app = angular.module("app", ["ui.router"])
.run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams; 

	// $state.go("main.aboutus");
}]);


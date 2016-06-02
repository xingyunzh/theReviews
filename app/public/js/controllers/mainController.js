app.controller('mainController', ['$scope', '$rootScope', function ($scope, $rootScope) {
	$scope.projects = [{
		name:"智能车场系统",
		ownername:"Mike Fake",
		description:"运用iBeacon技术对进出车场的车辆，智能推荐路线，认证和计费的系统。",
		imageUrl:"/images/boycoding.png"
	},
	{
		name:"超级账本",
		ownername:"Mike Fake",
		description:"运用区块链技术，建立起一套PC供应链生态系统的平台。",
		imageUrl:"/images/boycoding2.jpg"
	},
	{
		name:"智能粮仓",
		ownername:"Mike Fake",
		description:"基于物联网技术，对粮库的环境进行智能检测与管理。",
		imageUrl:"/images/boycoding.png"
	},
	{
		name:"无人机数据工厂",
		ownername:"Mike Fake",
		description:"针对无人机采集的大量数据，进行分析和处理的共享平台。",
		imageUrl:"/images/code.jpg"
	},
	{
		name:"代码市场",
		ownername:"Mike Fake",
		description:"这是一个针对代码进行二手交易的平台。",
		imageUrl:"/images/boycoding2.jpg"
	}];
	
	$scope.handleMasterHeadButtonClick = function () {
		 if ($rootScope.user) {
		 	$rootScope.$state.go("nav.workpanel");
		 }else {
		 	//TBD
		 };
	}
}]);
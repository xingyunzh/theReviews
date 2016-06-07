var sampleJSON = [{"_id":"573c8fa88eb11284c8088739","coachProfile":"573c8fa88eb11284c808873a","name":"Eric Yan","email":"eric.yan@xingyunzh.com","username":"ey","graduatedDate":"1970-01-01T00:00:00.000Z","__v":0,"isAdmin":false,"joinDate":"1970-01-01T00:00:00.000Z","password":"ddddddd","birth":"1970-01-01T00:00:00.000Z","sex":"male"},{"_id":"573d6de3b5f076311de36675","coachProfile":"573d6de3b5f076311de36676","name":"testman","lang":"English","email":"testman@xingyunzh.com","address":"HUST123","username":"tman","graduatedDate":"1970-01-01T00:00:00.000Z","__v":0,"isAdmin":false,"joinDate":"1970-01-01T00:00:00.000Z","password":"123","birth":"1970-01-01T00:00:00.000Z","sex":"female"},{"_id":"573d6e6454826d1126ddf417","coachProfile":"573d6e6454826d1126ddf418","name":"testman2","lang":"English","email":"testman2@xingyunzh.com","address":"HUST1234","username":"tman","graduatedDate":"1970-01-01T00:00:00.000Z","__v":0,"isAdmin":false,"joinDate":"1970-01-01T00:00:00.000Z","password":"1233","birth":"1970-01-01T00:00:00.000Z","sex":"male"},{"_id":"57455d4d256d4c203a79397c","name":"Ray Zhang","colleage":"Monashi in Australia","major":"IT","lang":"Chinese, English","email":"ray.zhang@xingyunzh.com","tel":"18986000000","address":"Donghu 1st","username":"rayzhang","graduatedDate":"2016-05-25T07:49:41.824Z","githubAccount":"ray.zhang@xingyunzh.com","__v":0,"isAdmin":false,"joinDate":"1970-01-01T00:00:00.000Z","password":"abcdefg","birth":"2016-05-25T07:33:01.824Z","sex":"male"},{"_id":"574653d164a5e7846b8c7060","name":"Henry Hu","colleage":"HUST","email":"henry.hu@xingyunzh.com","tel":"18987080000","username":"henryhu2","graduatedDate":"1970-01-01T00:00:00.000Z","__v":0,"isAdmin":false,"joinDate":"2016-05-26T01:39:29.508Z","password":"123456","birth":"1970-01-01T00:00:00.000Z","sex":"male"},{"_id":"574657636a78dc106c427e27","name":"Henry Hu","colleage":"HUST","email":"henry.hu@xingyunzh.com","tel":"18986090000","username":"henryhu","graduatedDate":"2017-05-02T00:00:00.000Z","__v":0,"isAdmin":false,"joinDate":"2016-05-26T01:54:43.582Z","password":"123456","birth":"1986-05-06T00:00:00.000Z","sex":"male"},{"_id":"574657e76a78dc106c427e29","name":"Henry Hu","colleage":"HUST","email":"henry.hu@xingyunzh.com","tel":"18987080000","address":"Zi Song","username":"s","graduatedDate":"2001-07-01T00:00:00.000Z","__v":0,"isAdmin":false,"joinDate":"2016-05-26T01:56:55.196Z","password":"123456","birth":"1990-10-01T00:00:00.000Z","sex":"male"},{"_id":"574a4fffde3a264c2a07cad0","name":"Jim Green","colleage":"HUST","major":"Administration","lang":"English","email":"jimgreen@sina.com","tel":"13700137000","address":"London, UK","username":"jimgreen","graduatedDate":"2001-07-01T00:00:00.000Z","githubAccount":"Not yet","__v":0,"isAdmin":false,"joinDate":"2016-05-29T02:12:15.908Z","password":"jimgreen","birth":"1990-10-01T00:00:00.000Z","sex":"male"},{"_id":"573c23726469ac1502875666","name":"Ray Zhang","email":"ray.zhang@xingyunzh.com","username":"rz","roles":[],"__v":0,"colleage":"Monash","graduatedDate":"2013-06-04T00:00:00.000Z","tel":"18987654442","address":"东湖壹号","githubAccount":"ray@git.com","lang":"中文，英文","major":"IT","isAdmin":false,"joinDate":"2016-05-18T08:04:26.751Z","password":"dddddd","birth":"2016-05-18T08:04:26.751Z","sex":"male"},{"_id":"574e9e97b37acefd4c469d56","name":"Test Forever","colleage":"HUST","major":"管理","lang":"中文","email":"test@sina.com","tel":"189876447637","address":"中国武汉","username":"test4ever","graduatedDate":"2012-06-01T00:00:00.000Z","__v":0,"isAdmin":false,"joinDate":"2016-06-01T08:36:39.051Z","password":"zzzzzz","birth":"1997-05-06T00:00:00.000Z","sex":"female"}];


app.controller("workpanelController", function($rootScope, $scope, $q, $uibModal) {
	$scope.teamUsers = sampleJSON;
	$scope.isInviteCollapsed = true;
	$scope.panel = {usernameToInvite : ""};

	$scope.deattach = function (user) {
		 _.remove($scope.teamUsers, function (u) {
		 	 return u._id === user._id;
		 });
	}

	$scope.invite = function () {
		 console.log("invite:" + $scope.panel.usernameToInvite);

		 var modalInstance = $uibModal.open({
		 	animation:true,
		 	templateUrl:kConfirmationHTML,
		 	controller:kConfirmationController,
		 	size:"sm",
		 	resolve: {
		 		title: function () {
		 			 return "发送邀请"; 
		 		},
		 		content:function () {
		 			 return "确认要发送邀请给：" + $scope.panel.usernameToInvite + "?";  
		 		}
		 	}
		 });

		 modalInstance.result.then(function ok() {
		 	console.log("confirmed to send"); 
		 }, function cancle(argument) {
		 	console.log("cancel sending");
		 });

	}

});
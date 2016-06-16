
app.controller("workpanelController", function($rootScope, $scope, $q, teamService, userService, projectService, reviewService,util) {
	$scope.panel = {
		usernameToInvite: "",
		isInviteCollapsed: true,
		isCreateTeamCollapsed: true,
		isCreateProjectCollapsed: true,
		workingProjectCollapse: true,
		teams: [],
		projects: [],
		workingProjectBackupSpace : {},
		workingProjectDateOptions: {
			minDate: new Date().setDate(new Date().getDate() - 1),
			startingDay: 1
		},
		workingProjectDatePicker:{
			popOpen:false,
			dateValue:new Date()
		}
	};

	$scope.initialize = function () {
		$scope.fetchTeams();

		projectService.getPhaseMapping().then(function (mapping) {
			 $scope.panel.projectPhaseMapping = mapping;
		}, function () {
			 $scope.panel.projectPhaseMapping = null; 
		});

		projectService.getStateMapping().then(function (mapping) {
			 $scope.panel.projectStateMapping = mapping;
		}, function () {
			 $scope.panel.projectStateMapping = null; 
		});

		reviewService.getContentTypeMapping().then(function (mapping) {
			 $scope.panel.reviewContentTypeMapping = mapping;
		}, function () {
			 $scope.panel.reviewContentTypeMapping = null; 
		});

		reviewService.getStateMapping().then(function (mapping) {
			 $scope.panel.reviewStateMapping = mapping;
		}, function () {
			 $scope.panel.reviewStateMapping = null; 
		});

	};

//Teams
	$scope.fetchTeams = function(tabName) {
		teamService.getByUser($rootScope.currentUser._id).then(function success(ts) {
			$scope.panel.teams = _.orderBy(ts, ['setupDate'],['asc']);

			if (tabName !== undefined) {
				$scope.panel.activeTeamTabIndex = util.indexOfObject($scope.panel.teams, {
					name: tabName
				}, function(obj1, obj2) {
					return obj1.name == obj2.name;
				});

			

			}else {
				$scope.panel.activeTeamTabIndex = 0;
			};

			$scope.panel.projectTeam = $scope.panel.teams[$scope.panel.activeTeamTabIndex];
			$scope.fetchProjectsFromTeams(ts);

		}, function fail(argument) {
			toastr.warning("读取团队信息失败",
				"Info", {
					timeOut: 0,
					closeButton: true
				});
		});
	};



	$scope.invite = function () {
		var username = $scope.panel.usernameToInvite;
		if (!username) {
			toastr.warning("请输入用户名", "错误", {timeOut:10, closeButton:true});
			return;
		};

		userService.getUserByUsername(username).then(function success(user) {
			if (user == null) {
				toastr.warning("用户不存在，请输入正确的用户名", "错误", {
					timeOut: 10,
					closeButton: true
				});

				return;
			};

			util.confirmationStep("发送邀请", "确认要发送邀请给：" + username + " " + $scope.panel.inviteRoleCN + "?").then(function ok(argument) {
				var t = $scope.panel.teams[$scope.panel.activeTeamTabIndex];
				var update = {};
				var isForCoach = $scope.panel.inviteRoleCN === "教练";
				if (isForCoach) {
					coaches = t.coaches == null ? [] : t.coaches;
					coaches.push(user._id);

					update.coaches = coaches;
				} else {
					members = t.members == null ? [] : t.members;
					members.push({
						"user": user._id,
						role: "Developer"
					});

					update.members = members;
				};

				teamService.updateTeamById(t._id, update).then(function success(team) {
					toastr.info("添加成功！", "Info");
					$scope.panel.usernameToInvite = null;
					t.coaches = team.coaches;
					t.members = team.members;

				}, function fail(data) {
					toastr.warning("添加失败" + data, "错误", {
						timeOut: 0,
						closeButton: true
					});
				});
			}, function cancel(argument) {
				console.log("cancel sending");
			});

		}, function fail() {
			toastr.warning("请稍后重试", "错误", {
				timeOut: 10,
				closeButton: true
			});
		});

	};

	$scope.createTeam = function() {
		var tname = $scope.panel.teamNameToCreate;
		var tdesc = $scope.panel.teamDescriptionToCreate;

		if (tname == null || tname.length < 1) {
			toastr.warning("团队名不能为空", "错误", {timeOut:0, closeButton:true});
			return;
		};

		toastr.info("正在提交，请稍后", "Info", {timeOut:0});
		teamService.createTeam({
			name:tname,
			description:tdesc,
			members:[{user:$rootScope.currentUser._id, role:"Developer"}]
		}).then(function success(argument) {
			toastr.remove();
			toastr.success("创建成功", "Info", {timeOut:5});
			$scope.fetchTeams(tname);
			$scope.panel.isCreateTeamCollapsed = true;
			

		}, function fail(argument) {
			toastr.remove();

			toastr.warning("创建失败", "Info", {timeOut:0, closeButton:true});
		});
	};


	$scope.deleteMember = function(member) {
		var t = $scope.panel.teams[$scope.panel.activeTeamTabIndex];
		util.confirmationStep("删除成员", "是否从" + t.name + "中删除成员：" + member.user.name + "?").then(function ok(argument) {
			// body...  
			_.remove(t.members, function(mem) {
				return mem.user._id == member.user._id;
			});

			var update = {
				members: t.members
			};

			teamService.updateTeamById(t._id, update).then(function success(team) {
				toastr.info("删除成功！", "Info");
				t.members = team.members;
			}, function fail(data) {
				toastr.warning("删除失败" + data, "错误", {
					timeOut: 0,
					closeButton: true
				});
			});

		}, function cancel(argument) {
			//do nothing
		})
	};

	$scope.deleteCoach = function(coach) {
		var t = $scope.panel.teams[$scope.panel.activeTeamTabIndex];
		util.confirmationStep("删除教练", "是否从" + t.name + "中删除教练：" + coach.name + "?").then(function ok(argument) {
			// body...  
			_.remove(t.coaches, function(c) {
				return c._id == coach._id;
			});

			var update = {
				coaches: t.coaches
			};

			teamService.updateTeamById(t._id, update).then(function success(team) {
				toastr.info("删除成功！", "Info");
				t.coaches = team.coaches;
			}, function fail(data) {
				toastr.warning("删除失败" + data, "错误", {
					timeOut: 0,
					closeButton: true
				});
			});

		}, function cancel(argument) {
			//do nothing
		})
	};

	$scope.leaveThisTeam = function (team) {
		 util.confirmationStep("退出团队", "是否从" + team.name + "中退出？").then(function ok(argument) {
		 	_.remove(team.members, function(mem) {
				return mem.user._id == $rootScope.currentUser._id;
			});

			var update = {
				members: team.members
			};

			teamService.updateTeamById(team._id, update).then(function success() {
				toastr.info("退出成功！", "Info");
				$scope.fetchTeams();

			}, function fail(data) {
				toastr.warning("退出失败， 请重试。" + data, "错误", {
					timeOut: 0,
					closeButton: true
				});
			});


		 }, function cancel() {
		 	 /* do nohing... */ 
		 });
	};

	$scope.releaseTeam = function(team) {
		util.confirmationStep("解散团队", "是否决定解散 " + team.name + " ？ (此操作无法撤销)。").then(function ok(argument) {
			teamService.releaseTeamById(team._id).then(function success() {
				toastr.info("成功解散团队", "Info");
				$scope.fetchTeams();
			}, function fail(argument) {
				toastr.warning("操作失败， 请重试。" + argument, "错误", {
					timeOut: 0,
					closeButton: true
				});
			});
		}, function cancel() {

		});
	};

//Projects

	$scope.fetchProjectsFromTeams = function (teams) {
		 /* body... */ 
		 if (teams == null || teams.length == 0) {
		 	return;
		 };

		 projectService.getProjectsByTeams(teams).then(function success(pjts) {
		 	 $scope.panel.projects = pjts;

		 }, function fail(argument) {
		 	 toastr.warning("项目查找失败！", "错误", {timeOut:10, closeButton:true});
		 })
	}

	$scope.createProject = function () {
		if ($scope.panel.projectNameToCreate == null) {
			toastr.warning("项目名不能为空！", "错误", {timeOut:0, closeButton:true});
			return;
		};

		var p = {name : $scope.panel.projectNameToCreate, description : $scope.panel.projectDescriptionToCreate};
		p.team = $scope.panel.projectTeam._id;
		p.endDate = new Date().setMonth(new Date().getMonth() + 6);

		projectService.createProject(p).then(function success(ps) {
			 $scope.panel.projects = _.orderBy(ps, ['createDate'], ['desc']);
			 $scope.panel.isCreateProjectCollapsed = true;
			 $scope.fetchProjectsFromTeams($scope.panel.teams);

		}, function fail(argument) {
			 // body...  
			 toastr.warning("项目创建失败，请稍后再试！", "错误", {timeOut:10, closeButton:true});
		});
	};

	$scope.workOnProject = function (project) {
		 $scope.panel.workingProject = project;

		 $scope.panel.workingProjectBackupSpace.phase = project.phase;
		 $scope.panel.workingProjectBackupSpace.state = project.state;

		 $scope.panel.workingProjectDatePicker.dateValue = new Date(project.endDate);
		 $scope.panel.workingProjectCollapse = false;
	}

	$scope.deleteProject = function(project) {

		util.confirmationStep("删除项目", "请确认是否删除项目:" + project.name + " ?").then(function ok(argument) {
			projectService.deleteProject(project).then(function success() {
				toastr.info("删除成功！", "Info");

				$scope.fetchProjectsFromTeams($scope.panel.teams);
			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "Info");
			});
		}, function cancel(argument) {
			// do nothing.
		});

	}

	$scope.editProjectName = function () {
		 util.modalTextInputStep("项目名", $scope.panel.workingProject.name).then(function ok(argument) {
		 	 projectService.updateProjectById($scope.panel.workingProject._id, {name:argument}).then(function success(data) {
		 	 	 $scope.panel.workingProject.name = argument;
		 	 });
		 });
	}

	$scope.editProjectDescription = function () {
		 util.modalTextInputStep("项目简介", $scope.panel.workingProject.description).then(function ok(argument) {
		 	 projectService.updateProjectById($scope.panel.workingProject._id, {description:argument}).then(function success() {
		 	 	 $scope.panel.workingProject.description = argument;
		 	 });
		 });
	}

	$scope.editProjectPhase = function() {
		projectService.updateProjectById($scope.panel.workingProject._id, {
			phase: $scope.panel.workingProject.phase
		}).then(function success(argument) {
			$scope.panel.workingProjectBackupSpace.phase = $scope.panel.workingProject.phase;
		}, function fail(argument) {
			toastr.warning("操作失败，请稍后再试！", "系统错误");
			$scope.panel.workingProject.phase = $scope.panel.workingProjectBackupSpace.phase;
		});
	}

	$scope.editProjectState = function() {
		projectService.updateProjectById($scope.panel.workingProject._id, {
			phase: $scope.panel.workingProject.state
		}).then(function success(argument) {
			$scope.panel.workingProjectBackupSpace.state = $scope.panel.workingProject.state;
		}, function fail(argument) {
			toastr.warning("操作失败，请稍后再试！", "系统错误");
			$scope.panel.workingProject.state = $scope.panel.workingProjectBackupSpace.state;
		});
	}

	$scope.editProjectEndDate = function () {
		 projectService.updateProjectById($scope.panel.workingProject._id, {
		 	endDate:$scope.panel.workingProjectDatePicker.dateValue
		 }).then(function success (argument) {
		 	 $scope.panel.workingProject.endDate = $scope.panel.workingProjectDatePicker.dateValue;
		 }, function fail (argument) {
		 	 toastr.warning("操作失败，请稍后再试！", "系统错误");
		 	 $scope.panel.workingProjectDatePicker.dateValue = $scope.panel.workingProject.endDate;
		 });
	}

	$scope.editProjectOwner = function () {
		 util.modalUserInputStep("项目经理").then(function(user) {
		 	 projectService.updateProjectById($scope.panel.workingProject._id, {
		 	 	owner:user._id
		 	 }).then(function success(argument) {
		 	 	$scope.panel.workingProject.owner = user; 
		 	 }, function fail(argument) {
		 	 	toastr.warning("操作失败，请稍后再试！", "系统错误");
		 	 });
		 });
	}

	$scope.editProductOwner = function () {
		 util.modalUserInputStep("产品经理").then(function(user) {
		 	 projectService.updateProjectById($scope.panel.workingProject._id, {
		 	 	productOwner:user._id
		 	 }).then(function success(argument) {
		 	 	$scope.panel.workingProject.productOwner = user; 
		 	 }, function fail(argument) {
		 	 	toastr.warning("操作失败，请稍后再试！", "系统错误");
		 	 });
		 });		 
	}

	$scope.addNewStakeholder = function() {
		var stakes = _.map($scope.panel.workingProject.stakeholders, function(obj) {
			if (angular.isUndefined(obj._id)) {
				return obj;
			} else {
				return obj._id;
			};
		});

		util.modalUserInputStep("添加新的干系人").then(function(user) {
			stakes.push(user._id);

			projectService.updateProjectById($scope.panel.workingProject._id, {
				stakeholders: stakes
			}).then(function success(argument) {
				$scope.panel.workingProject.stakeholders.push(user);
			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});
		});
	}

	$scope.deleteStakeholder = function(stakeholder) {
		util.confirmationStep("删除干系人", "确认删除干系人：" + stakeholder.name + "?").then(function success(argument) {
			var stakes = _.map($scope.panel.workingProject.stakeholders, function(obj) {
				if (angular.isUndefined(obj._id)) {
					return obj;
				} else {
					return obj._id;
				};
			});

			_.remove(stakes, function(userId) {
				return stakeholder._id === userId;
			});

			projectService.updateProjectById($scope.panel.workingProject._id, {
				stakeholders: stakes
			}).then(function success(argument) {
				_.remove($scope.panel.workingProject.stakeholders, function(obj) {
					return obj === stakeholder._id || obj._id === stakeholder._id;
				});

			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});

		});
	}

	$scope.createReview = function () {
		 reviewService.reviewPanelModalStep("新建评审").then(function success(reviewId) {
		 	var reviewsParam = _.map($scope.panel.workingProject.reviews, function (rv) {
		 		 return rv._id;
		 	});

		 	reviewsParam.push(reviewId);

		 	projectService.updateProjectById($scope.panel.workingProject._id, {
		 		reviews:reviewsParam
		 	}).then(function success(argument) {
		 		$scope.panel.workingProject = argument;
		 	}, function fail(argument) {
		 		  toastr.warning("更新项目评审信息失败！", "系统错误");
		 	});
		 	 
		 }); 
	}

	$scope.editReview = function (review) {
		 reviewService.reviewPanelModalStep("编辑评审", review).then(function success(reviewId) {

		 }); 		 
	}

	$scope.initialize();
});
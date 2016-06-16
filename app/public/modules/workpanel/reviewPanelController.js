app.controller("reviewPanelController", function ($rootScope, $scope, $uibModalInstance, title, review, reviewService, util) {
	var defaultStartDate = new Date();
	var defaultDueDate = new Date().setDate(new Date().getDate() + 7);

	$scope.title = title;

	$scope.modal = {
		isCreating: review == null ? true : false,
		"review": review == null ? {
			name:"",
			createDate: new Date(),
			owner: $rootScope.currentUser,
			mediator: $rootScope.currentUser,
			state: 0,
			contentType: 0,
			reviewers:[],
			approvers:[],
			observers:[],
			startDate:defaultStartDate,
			dueDate:defaultDueDate,
			gitURL:"",
			docURL:""
		} : review,
		reviewDatePicker: {
			options: {
				minDate: new Date().setDate(new Date().getDate() - 1),
				startingDay: 1
			},
			startDate: review == null ? defaultStartDate : new Date(review.startDate),
			dueDate: review == null ?  defaultDueDate: new Date(review.dueDate),

		},

	};

	$scope.initialize = function() {
		reviewService.getContentTypeMapping().then(function(mapping) {
			$scope.modal.reviewContentTypeMapping = mapping;
		}, function() {
			$scope.modal.reviewContentTypeMapping = null;
		});

		reviewService.getStateMapping().then(function(mapping) {
			$scope.modal.reviewStateMapping = mapping;
		}, function() {
			$scope.modal.reviewStateMapping = null;
		});
	}

	$scope.checkReviewCreationParam = function (param) {
		if (param.name == null || param.name.length == 0) {
			return "请输入评审名称";
		};

		function extractId (obj) {
			 if(angular.isString(obj) || obj == null) {
			 	return obj;
			 }
			 else {
			 	return obj._id;
			 };
		}

		param.owner = extractId(param.owner);
		param.mediator = extractId(param.mediator);
		param.reviewers = _.map(param.reviewers, extractId);
		param.approvers = _.map(param.approvers, extractId);
		param.observers = _.map(param.observers, extractId);

		return null;
	}

	$scope.ok = function() {
		/* body... */
		var reviewParam = angular.copy($scope.modal.review);
		var msg = $scope.checkReviewCreationParam(reviewParam);
		if (msg != null) {
			toastr(msg, "错误", {
				timeOut: 0,
				closeButton: true
			});

			return;
		};

		reviewService.createReview(reviewParam).then(function success(argument) {
			$uibModalInstance.close(argument.id);
		}, function fail(argument) {
			toastr.warning("操作失败，请稍后再试！", "系统错误");
		});
	};

	$scope.cancel = function () {
		 /* body... */ 
		 if ($scope.modal.isCreating) {
		 	$uibModalInstance.dismiss("cancel");
		 }
		 else {
		 	$uibModalInstance.close($scope.modal.review);
		 };
	};

//functionalities

	$scope.editReviewName = function () {
		util.modalTextInputStep("评审名", $scope.modal.review.name).then(function ok(argument) {
			if ($scope.modal.isCreating) {
				$scope.modal.review.name = argument;
				return;
			};

			reviewService.updateReviewById($scope.modal.review._id, {
				name: argument
			}).then(function success(data) {
				$scope.modal.review.name = argument;
			});
		});
	}

	$scope.editContentType = function (newValue){
		if ($scope.modal.isCreating) {
			$scope.modal.review.contentType = newValue;
			return;
		};

		reviewService.updateReviewById($scope.modal.review._id, {
			contentType : newValue
		}).then(function success(argument) {
			$scope.modal.review.contentType = newValue;
		}, function fail(argument) {
			toastr.warning("操作失败，请稍后再试！", "系统错误");
		});
	}

	$scope.editState = function(newValue){
		if ($scope.modal.isCreating) {
			$scope.modal.review.state = newValue;
			return;
		};

		reviewService.updateReviewById($scope.modal.review._id, {
			state : newValue
		}).then(function success(argument) {
			$scope.modal.review.state = newValue;
		}, function fail(argument) {
			toastr.warning("操作失败，请稍后再试！", "系统错误");
		});
	}

	$scope.editGitURL = function() {
		util.modalTextInputStep("GitURL", $scope.modal.review.gitURL).then(function ok(argument) {
			if ($scope.modal.isCreating) {
				$scope.modal.review.gitURL = argument;
				return;
			};

			reviewService.updateReviewById($scope.modal.review._id, {
				gitURL: argument
			}).then(function success(data) {
				$scope.modal.review.gitURL = argument;
			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});
		});
	}

	$scope.editDocURL = function(){
		util.modalTextInputStep("DocURL", $scope.modal.review.docURL).then(function ok(argument) {
			if ($scope.modal.isCreating) {
				$scope.modal.review.docURL = argument;
				return;
			};

			reviewService.updateReviewById($scope.modal.review._id, {
				docURL: argument
			}).then(function success(data) {
				$scope.modal.review.docURL = argument;
			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});
		});

	}

	$scope.editReviewStartDate = function(){
		if ($scope.modal.isCreating) {
			$scope.modal.review.startDate = $scope.modal.reviewDatePicker.startDate;
			return;
		};

		reviewService.updateReviewById($scope.modal.review._id, {
			startDate: $scope.modal.reviewDatePicker.startDate
		}).then(function success(data) {
			$scope.modal.review.startDate = $scope.modal.reviewDatePicker.startDate;
		}, function fail(argument) {
			toastr.warning("操作失败，请稍后再试！", "系统错误");
		});
	}

	$scope.editReviewDueDate = function(){
		if ($scope.modal.isCreating) {
			$scope.modal.review.dueDate = $scope.modal.reviewDatePicker.dueDate;
			return;
		};

		reviewService.updateReviewById($scope.modal.review._id, {
			dueDate: $scope.modal.reviewDatePicker.dueDate
		}).then(function success(data) {
			$scope.modal.review.dueDate = $scope.modal.reviewDatePicker.dueDate;
		}, function fail(argument) {
			toastr.warning("操作失败，请稍后再试！", "系统错误");
		});
	}

	$scope.editReviewOwner = function(){
		 util.modalUserInputStep("评审所有人").then(function(user) {
			if ($scope.modal.isCreating) {
				$scope.modal.review.owner = user;
				return;
			};

		 	 reviewService.updateReviewById($scope.modal.review._id, {
		 	 	owner:user._id
		 	 }).then(function success(argument) {
		 	 	$scope.modal.review.owner = user; 
		 	 }, function fail(argument) {
		 	 	toastr.warning("操作失败，请稍后再试！", "系统错误");
		 	 });
		 });
	}

	$scope.editReviewMediator = function(){
		 util.modalUserInputStep("评审协调人").then(function(user) {
			if ($scope.modal.isCreating) {
				$scope.modal.review.mediator = user;
				return;
			};

		 	 reviewService.updateReviewById($scope.modal.review._id, {
		 	 	mediator:user._id
		 	 }).then(function success(argument) {
		 	 	$scope.modal.review.mediator = user; 
		 	 }, function fail(argument) {
		 	 	toastr.warning("操作失败，请稍后再试！", "系统错误");
		 	 });
		 });
	}

	$scope.deleteReviewer = function(reviewer) {
		util.confirmationStep("删除评审人", "确认删除评审人：" + reviewer.name + "?").then(function success(argument) {
			if ($scope.modal.isCreating) {
				_.remove($scope.modal.review.reviewers, function (obj) {
					 return obj._id == reviewer._id;
				});

				return;
			};

			var reviewers = _.map($scope.modal.review.reviewers, function(obj) {
				if (angular.isUndefined(obj._id)) {
					return obj;
				} else {
					return obj._id;
				};
			});

			_.remove(reviewers, function(userId) {
				return reviewer._id === userId;
			});

			reviewService.updateReviewById($scope.modal.review._id, {
				"reviewers": reviewers
			}).then(function success(argument) {
				_.remove($scope.modal.review.reviewers, function(obj) {
					return obj === reviewer._id || obj._id === reviewer._id;
				});

			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});

		});
	}

	$scope.addNewReviewer = function() {
		util.modalUserInputStep("添加新的评审人").then(function(user) {
			if ($scope.modal.isCreating) {
				$scope.modal.review.reviewers.push(user);

				return;
			};

			var reviewers = _.map($scope.modal.review.reviewers, function(obj) {
				if (angular.isUndefined(obj._id)) {
					return obj;
				} else {
					return obj._id;
				};
			});

			reviewers.push(user._id);
			reviewService.updateReviewById($scope.modal.review._id, {
				"reviewers": reviewers
			}).then(function success(argument) {
				$scope.modal.review.reviewers.push(user);
			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});
		});
	}

	$scope.deleteApprover = function(approver) {
		util.confirmationStep("删除批准人", "确认删除批准人：" + approver.name + "?").then(function success(argument) {
			if ($scope.modal.isCreating) {
				_.remove($scope.modal.review.approvers, function (obj) {
					 return obj._id == approver._id;
				});

				return;
			};

			var approvers = _.map($scope.modal.review.approvers, function(obj) {
				if (angular.isUndefined(obj._id)) {
					return obj;
				} else {
					return obj._id;
				};
			});

			_.remove(approvers, function(userId) {
				return approver._id === userId;
			});

			reviewService.updateReviewById($scope.modal.review._id, {
				"approvers": approvers
			}).then(function success(argument) {
				_.remove($scope.modal.review.approvers, function(obj) {
					return obj === approver._id || obj._id === approver._id;
				});

			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});

		});
	}

	$scope.addNewApprover = function(){
			util.modalUserInputStep("添加新的批准人").then(function(user) {
			if ($scope.modal.isCreating) {
				$scope.modal.review.approvers.push(user);

				return;
			};

			var approvers = _.map($scope.modal.review.approvers, function(obj) {
				if (angular.isUndefined(obj._id)) {
					return obj;
				} else {
					return obj._id;
				};
			});

			approvers.push(user._id);
			reviewService.updateReviewById($scope.modal.review._id, {
				"approvers": approvers
			}).then(function success(argument) {
				$scope.modal.review.approvers.push(user);
			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});
		});
	}

	$scope.deleteObserver = function(observer){
		util.confirmationStep("删除观察者", "确认删除观察者：" + observer.name + "?").then(function success(argument) {
			if ($scope.modal.isCreating) {
				_.remove($scope.modal.review.observers, function (obj) {
					 return obj._id == observer._id;
				});

				return;
			};

			var observers = _.map($scope.modal.review.observers, function(obj) {
				if (angular.isUndefined(obj._id)) {
					return obj;
				} else {
					return obj._id;
				};
			});

			_.remove(observers, function(userId) {
				return observer._id === userId;
			});

			reviewService.updateReviewById($scope.modal.review._id, {
				"observers": observers
			}).then(function success(argument) {
				_.remove($scope.modal.review.observers, function(obj) {
					return obj === observer._id || obj._id === observer._id;
				});

			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});

		});
	}

	$scope.addNewObserver = function(){
			util.modalUserInputStep("添加新的观察者").then(function(user) {
			if ($scope.modal.isCreating) {
				$scope.modal.review.observers.push(user);

				return;
			};

			var observers = _.map($scope.modal.review.observers, function(obj) {
				if (angular.isUndefined(obj._id)) {
					return obj;
				} else {
					return obj._id;
				};
			});

			observers.push(user._id);
			reviewService.updateReviewById($scope.modal.review._id, {
				"observers": observers
			}).then(function success(argument) {
				$scope.modal.review.observers.push(user);
			}, function fail(argument) {
				toastr.warning("操作失败，请稍后再试！", "系统错误");
			});
		});
	}


	$scope.initialize();
});
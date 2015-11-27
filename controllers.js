var yummyControllers = angular.module('yummyControllers', []);

yummyControllers.controller('HomeController', ['$scope',
	function ($scope) {
		$scope.value = 'home';
	}
]);

yummyControllers.controller('TestController', ['$scope',
	function ($scope) {
		$scope.value = 'test';
	}
]);

var yummyApp = angular.module('yummy', [
	'ngRoute',
	'yummyControllers'
]);

yummyApp.config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'HomeController'
		})
		.when('/dashboard', {
			templateUrl: 'views/dashboard.html',
			controller: 'DashboardController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
]);

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
		.when('/search', {
			templateUrl: 'views/search.html',
			controller: 'SearchController'
		})
		.when('/dish', {
			templateUrl: 'views/dish.html',
			controller: 'DishController'
		})
		.otherwise({
			redirectTo: '/'
		});
	}
]);

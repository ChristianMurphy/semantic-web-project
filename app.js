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
		.otherwise({
			redirectTo: '/'
		});
	}
]);

yummyApp.factory('fusekiData', function ($http) {
	var query = encodeURIComponent('SELECT ?subject ?predicate ?object WHERE { ?subject ?predicate ?object} LIMIT 25');
	var endpoint = 'http://159.203.251.131:8000/yummy/query';
	return $http.get(endpoint + '?query=' + query + '&output=json&stylesheet=');
});

var yummyControllers = angular.module('yummyControllers', []);

yummyControllers.controller('HomeController', ['$scope', '$http', '$route', '$routeParams', '$location',
	function ($scope, $http, $route, $routeParams, $location) {
		$scope.value = 'home';

		// Carousel code
		$scope.w = window.innerWidth;
		$scope.h = window.innerHeight - 20;
		$scope.uri = 'http://lorempixel.com';
		$scope.folders = [
			'food'
		];

		$scope.images = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

		$scope.currentFolder = $scope.folders[0];
		$scope.selectFolder = function (folder) {
			$scope.currentFolder = folder;
		};
		$scope.activeFolder = function (folder) {
			return (folder === $scope.currentFolder) ? 'active' : '';
		};

		// Dummy dropdown data for recipe
		$scope.items = [];

		$.ajax({
			url: 'http://159.203.251.131:8000/test2/query',
			method: 'POST',
			data: 'query=SELECT ?object WHERE {?subject <http://localhost:3333/hasCuisine> ?object} GROUP BY ?object'
		})
		.done(function (data) {
			$scope.items = data.results.bindings;
			$scope.$apply();
		});

		// Called on clicking search button
		$scope.getRecipe = function () {
			// Block for http request to fuseki server
			$location.search('query', $scope.query.object.value);
			$location.path('/search');
		};
	}
]);

yummyControllers.controller('SearchController', ['$scope','fusekiData',
	function ($scope,fusekiData) {
		$scope.value = 'Here are your Query Results.....';
		fusekiData.success(function(response) {
			$scope.fusekiResults = response.results.bindings;
		});
	}
]);
yummyApp.factory('fusekiData', function($http){

	var query = encodeURIComponent('SELECT ?subject ?predicate ?object WHERE { ?subject ?predicate ?object} LIMIT 25');
	var endpoint = "http://159.203.251.131:8000/test/query";
	return $http.get("http://159.203.251.131:8000/test/query?query="+query+"&output=json&stylesheet=")
});

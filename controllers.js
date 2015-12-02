var yummyControllers = angular.module('yummyControllers', []);

yummyControllers.controller('HomeController', ['$scope', '$location',
	function ($scope, $location) {
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

		// List cuisines
		$scope.items = [];

		$.ajax({
			url: 'http://159.203.251.131:8000/yummy/query',
			method: 'POST',
			data: 'query=SELECT ?object WHERE {?subject <http://localhost:3333/hasCuisine> ?object} GROUP BY ?object'
		})
		.done(function (data) {
			$scope.items = data.results.bindings;
			$scope.$apply();
		});

		// Called on clicking search button
		$scope.getRecipe = function () {
			// Transition to search results view
			$location.search('query', $scope.query.object.value);
			$location.path('/search');
		};
	}
]);

yummyControllers.controller('SearchController', ['$scope', '$routeParams',
	function ($scope, $routeParams) {
		// Search for results based on cuisine
		$scope.items = [];
		$.ajax({
			url: 'http://159.203.251.131:8000/yummy/query',
			method: 'POST',
			data: 'query=SELECT ?name ?dishid WHERE {?cuisine <http://localhost:3333/hasCuisine> "' + $routeParams.query + '". ?cuisine <http://www.w3.org/1999/02/22-rdf-syntax-ns#value> ?dishid. ?dish <http://www.w3.org/1999/02/22-rdf-syntax-ns#value> ?dishid. ?dish <http://127.0.0.1:3333/hasDishName> ?name.}'
		})
		.done(function (data) {
			$scope.items = data.results.bindings;
			$scope.$apply();
		});
	}
]);

yummyControllers.controller('DishController', ['$scope', '$routeParams',
	function ($scope, $routeParams) {
		$scope.id = $routeParams.id;
	}
]);

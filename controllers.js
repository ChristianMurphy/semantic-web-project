var yummyControllers = angular.module('YummyControllers', []);

yummyControllers.filter('properName', function () {
	return function (input) {
		var mapping = {
			'http://www.semanticweb.org/team-1/yummy-app#hasIngredient': 'ingredient',
			//'http://127.0.0.1:3333/hasDishName': 'name',
			//'http://www.semanticweb.org/team-1/yummy-app#hasSolidFats': 'solid fat',
			//'http://www.semanticweb.org/team-1/yummy-app#hasSaturatedFats': 'saturated fat',
			//'http://127.0.0.1:3333/hasCuisine': 'cuisine',
			//'http://127.0.0.1:3333/hasAlcohols': 'alochol content',
			//'http://127.0.0.1:3333/hasCalories': 'calories'
		};
		return mapping[input];
	};
});

yummyControllers.filter('allowedPredicates', function () {
	return function (input) {
		var allowed = [
			'http://www.semanticweb.org/team-1/yummy-app#hasIngredient',
			//'http://127.0.0.1:3333/hasDishName',
			//'http://www.semanticweb.org/team-1/yummy-app#hasSolidFats',
			//'http://www.semanticweb.org/team-1/yummy-app#hasSaturatedFats',
			//'http://127.0.0.1:3333/hasCuisine',
			//'http://127.0.0.1:3333/hasAlcohols',
			//'http://127.0.0.1:3333/hasCalories'
		];

		var final = [];

		for (var index = 0; index < input.length; index++) {
			if (allowed.indexOf(input[index].attribute.value) >= 0) {
				final.push(input[index]);
			}
		}

		return final;
	};
});

//For Nutrition Data
yummyControllers.filter('actualNutrients', function () {
	return function (input) {
		var mapping = {
			//'http://www.semanticweb.org/team-1/yummy-app#hasIngredient': 'ingredient',
			//'http://127.0.0.1:3333/hasDishName': 'name',
			'http://www.semanticweb.org/team-1/yummy-app#hasSolidFats': 'solid fat',
			'http://www.semanticweb.org/team-1/yummy-app#hasSaturatedFats': 'saturated fat',
			'http://127.0.0.1:3333/hasCuisine': 'cuisine',
			'http://127.0.0.1:3333/hasAlcohols': 'alochol content',
			'http://127.0.0.1:3333/hasCalories': 'calories'
		};
		return mapping[input];
	};
});

yummyControllers.filter('allowedNutrients', function () {
	return function (input) {
		var allowed = [
			//'http://www.semanticweb.org/team-1/yummy-app#hasIngredient',
			//'http://127.0.0.1:3333/hasDishName',
			'http://www.semanticweb.org/team-1/yummy-app#hasSolidFats',
			'http://www.semanticweb.org/team-1/yummy-app#hasSaturatedFats',
			'http://127.0.0.1:3333/hasCuisine',
			'http://127.0.0.1:3333/hasAlcohols',
			'http://127.0.0.1:3333/hasCalories'
		];

		var final = [];

		for (var index = 0; index < input.length; index++) {
			if (allowed.indexOf(input[index].nutrient.value) >= 0) {
				final.push(input[index]);
			}
		}

		return final;
	};
});

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
			data: 'query=SELECT DISTINCT ?object WHERE {{?subject <http://localhost:3333/hasCuisine> ?object} UNION {?subject <http://127.0.0.1:3333/hasCuisine> ?object}}'
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
			data: 'query=SELECT DISTINCT ?name ?dishid WHERE {{?cuisine <http://localhost:3333/hasCuisine> "' + $routeParams.query + '"} UNION {?cuisine <http://127.0.0.1:3333/hasCuisine> "' + $routeParams.query + '"}. ?cuisine <http://www.w3.org/1999/02/22-rdf-syntax-ns#value> ?dishid. ?dish <http://www.w3.org/1999/02/22-rdf-syntax-ns#value> ?dishid. ?dish <http://127.0.0.1:3333/hasDishName> ?name.}'
		})
		.done(function (data) {
			$scope.items = data.results.bindings;
			$scope.$apply();
		});
	}
]);

yummyControllers.controller('DishController', ['$scope', '$routeParams',
	function ($scope, $routeParams) {
		// Find Dish Details
		$scope.items = [];
		$.ajax({
			url: 'http://159.203.251.131:8000/yummy/query',
			method: 'POST',
			data: 'query=SELECT ?nutrient ?nutritionContent WHERE {?dish <http://www.w3.org/1999/02/22-rdf-syntax-ns#value> "' + $routeParams.id + '". ?dish ?nutrient ?nutritionContent.}'
		})
		.done(function (data) {
			$scope.items = data.results.bindings;
			$scope.$apply();
		});
	}
]);


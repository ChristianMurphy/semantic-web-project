var yummyControllers = angular.module('yummyControllers', []);

yummyControllers.controller('HomeController', ['$scope', '$http','$route', '$routeParams','$location',
	function ($scope, $http,$route, $routeParams,$location) {
		$scope.value = 'home';

		// Carousel code
		$scope.w = window.innerWidth;
		$scope.h = window.innerHeight - 20;
		$scope.uri = "http://lorempixel.com";
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
		$scope.items = [{
			id: 0,
			label: 'Search Cuisine',
			subItem: {name: 'aSubItem'}
		},
			{
				id: 1,
				label: 'Mexican',
				subItem: {name: 'aSubItem'}
			}, {
				id: 2,
				label: 'Lebanese',
				subItem: {name: 'bSubItem'}
			},
			{
				id: 3,
				label: 'Chinese',
				subItem: {name: 'bSubItem'}
			},

			{
				id: 4,
				label: 'Indian',
				subItem: {name: 'bSubItem'}
			},

			{
				id: 5,
				label: 'Continental',
				subItem: {name: 'bSubItem'}
			}
		];

		//Setting the preloaded select recipe option, must be validated (opted out before sending HTTP request)
		$scope.selected = $scope.items[0];

		// Called on clicking search button
		$scope.getRecipe = function(){

			// Block for http request to fuseki server
			console.log(" HTTP request will be sent for retrieving data from fuseki server");
			$location.path('/dashboard');
		}

	}

]);

yummyControllers.controller('DashboardController', ['$scope',
	function ($scope) {
		$scope.value = 'Welcome to dashboard page.....Fuseki will return all the results here';
	}
]);

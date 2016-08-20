(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('MoviecardController', MoviecardController);

	MoviecardController.$inject = ['$rootScope', 'dataservice'];
	/* @ngInject */
	function MoviecardController($rootScope, dataservice) {
		var vm = this;
		var movies = [];

		$rootScope.movieClicked = movieClicked;

		vm.hideMovie = hideMovie;
		vm.movie = {};

		function hideMovie() {
			$rootScope.showMovie = false;
		}

		function movieClicked() {
			movies = dataservice.cache.get('movies');
            var movieIndex = dataservice.cache.get('movieIndex');

            vm.movie = movies[movieIndex];
            return vm.movie;
		}
	}

})();
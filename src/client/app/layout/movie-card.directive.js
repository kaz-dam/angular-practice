(function() {
	'use strict';

	angular
		.module('app.layout')
		.directive('movieCard', movieCard);

	/* @ngInject */
	function movieCard() {

		var directive = {
			controllerAs: 'vm',
			restrict: 'EA',
			scope: {
				title: '@',
				poster: '@'
			},
			templateUrl: 'app/layout/movie-card.html'
		};

		return directive;
	}
})();
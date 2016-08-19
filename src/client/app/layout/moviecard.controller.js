(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('MoviecardController', MoviecardController);

	/* @ngInject */
	function MoviecardController() {
		var vm = this;

		vm.hideMovie = hideMovie;

		function hideMovie() {
			$rootScope.showMovie = false;
		}
	}

})();
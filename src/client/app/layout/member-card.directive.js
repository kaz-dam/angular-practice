(function() {
	'use strict';

	angular
		.module('app.layout')
		.directive('memberCard', memberCard);

	/* @ngInject */
	function memberCard() {
		
		var directive = {
			controllerAs: 'vm',
			restrict: 'EA',
			scope: {
				firstName: '@',
				lastName: '@',
				phone: '@',
				email: '@'
			},
			templateUrl: 'app/layout/member-card.html'
		};

		return directive;
	}

})();
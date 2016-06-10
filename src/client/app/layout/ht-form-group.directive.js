(function() {
	'use strict';

	angular
		.module('app.layout')
		.directive('htFormGroup', htFormGroup);

	/* @ngInject */
	function htFormGroup() {
		
		var directive = {
			controller: FormGroupController,
			controllerAs: 'vm',
			restrict: 'EA',
			scope: {
				
			},
			templateUrl: 'app/layout/ht-form-group.html'
		};

		FormGroupController.$inject = ['$scope', 'dataservice'];

		/* @ngInject */
		function FormGroupController($scope, dataservice) {
			var vm = this;

		}

		return directive;
	}

})();
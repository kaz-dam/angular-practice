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
			replace: true,
			transclude: true,
			scope: {
				fgClass: '@',
				labelClass: '@',
				label: '@',
				inputDivClass: '@',
				inputName: '@',
				inputType: '@',
				value: '@',
				inputClass: '@',
				text: '@',
				formGroupModel: '='
			},
			templateUrl: 'app/layout/ht-form-group.html'
		};

		//////////////////////

		FormGroupController.$inject = ['$scope', 'dataservice'];

		/* @ngInject */
		function FormGroupController($scope, dataservice) {
			var vm = this;
		}

		return directive;
	}

})();
(function() {
	'use strict';

	angular
		.module('blocks.date')
		.factory('date', date);

	/* @ngInject */
	function date() {

		var service = {
			currentDate: currentDate
		};

		return service;

		////////////////////

		function currentDate() {
			var date = new Date();

			return date;
		}
	}

})();
(function() {
	'use strict';

	angular
		.module('blocks.timer')
		.factory('timer', timer);

	timer.$inject = ['$interval'];
	/* @ngInject */
	function timer($interval) {
		var timerPromise = [];

		var service = {
			timerFormat: timerFormat
		};

		return service;

		////////////////////

		function timerFormat(timeObj) {
			var hour = Math.ceil((timeObj / 60 / 60) - 1);
			var minute = Math.ceil((timeObj / 60 % 60) - 1);
			var second = Math.ceil(timeObj % 60);

			return hour + ' Hours,' + minute + ' Minutes,' + second + ' Seconds';
		}
	}

})();
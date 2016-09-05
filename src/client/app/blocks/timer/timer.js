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
			var hour = Math.floor(timeObj / 60 / 60);
			var minute = Math.floor(timeObj / 60 % 60);
			var second = Math.ceil(timeObj % 60);
			
			if (second < 10) {
				second = '0' + second;
			}

			return hour + ' : ' + minute + ' : ' + second;
		}
	}

})();
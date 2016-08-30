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
			getTimer: getTimer,
			timerFormat: timerFormat
		};

		return service;

		////////////////////

		function getTimer(i, getTimeObj) {
			var returnedObjs = [];
			timerPromise[i] = $interval(function() {
				if (getTimeObj[i] <= 0) {
		    		getTimeObj[i] = 0;
		    	} else {
		    		getTimeObj[i] = getTimeObj[i] - 1;
		    		returnedObjs.push(timerFormat(getTimeObj[i]));
		    		// return returnedObjs;
		    		// console.log(returnedObjs);
		    	}
			}, 1000);
	    	
		}

		function timerFormat(timeObj) {
			var format = '';
			var hour = Math.ceil(timeObj / 60 / 60);
			var minute = Math.ceil(timeObj / 60 % 60);
			var second = Math.ceil(timeObj % 60);

			return hour + ' Hours,' + minute + ' Minutes,' + second + ' Seconds';
			// return format;
		}
	}

})();
(function() {
	'use strict';

	angular
		.module('blocks.timer')
		.factory('timer', timer);

	timer.$inject = ['$interval'];
	/* @ngInject */
	function timer($interval) {

		var service = {
			getTimer: getTimer
		};

		return service;

		////////////////////

		function getTimer(getTimeObj) {
			$interval(function() {
		        for (var i = 0; i < getTimeObj.length; i++) {
		        	if (getTimeObj[i] <= 0) {
		        		getTimeObj[i] = 0;
		        	} else {
		        		getTimeObj[i] = getTimeObj[i] - 1000;
		        	}

		        	if (getTimeObj[i] <= 3600000) {
		        		vm.warning = true;
		        	} else if (getTimeObj[i] <= 1800000) {
		        		vm.warning = false;
		        		vm.alert = true;
		        	}
		        }
		    }, 1000);
		}
	}

})();
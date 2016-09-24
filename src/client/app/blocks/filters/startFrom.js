(function() {
	'use strict';

	angular
		.module('blocks.filters')
		.filter('startFrom', startFrom);

	/* @ngInject */
	function startFrom() {
		return function(data, start) {
			return data.slice(start);
		};
	}

})();
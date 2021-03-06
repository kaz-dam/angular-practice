(function() {
	'use strict';

	angular
		.module('blocks.filters')
		.filter('rentFilter', rentFilter);

	/* @ngInject */
	function rentFilter() {
		return function(member) {
			return member.filter(function(mem) {
				if (mem.rentedMovies.length) {
					return mem;
				}
			});
		};
	}

})();
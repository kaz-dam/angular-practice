(function() {
	'use strict';

	angular
		.module('blocks.filters')
		.filter('NotRentedMovies', NotRentedMovies);

	/* @ngInject */
	function NotRentedMovies() {
		return function(movies, keyword) {
			return movies.filter(function(mo) {
				var title = mo.Title.toLowerCase();
				if (title.includes(keyword.toLowerCase())) {
					return title;
				}
			});
		}
	}

})();
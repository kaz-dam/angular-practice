(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('MembercardController', MembercardController);

	MembercardController.$inject = ['$rootScope', '$filter', 'dataservice'];
	/* @ngInject */
	function MembercardController($rootScope, $filter, dataservice) {
		var vm = this;
		var members = {};
        
        $rootScope.clickEvent = clickEvent;

        vm.hideMember = hideMember;
        vm.member = {};
        vm.movieSearch = '';
        vm.searchedMovies = []; // TODO function to iterate through the dataset
        vm.searchMovies = searchMovies;

        function hideMember() {
            $rootScope.showMember = false;
        }

        function clickEvent() {
        	members = dataservice.cache.get('members');
            var memberIndex = dataservice.cache.get('memberIndex');

            vm.member = members[memberIndex];
            return vm.member;
        }

        function searchMovies() {
        	var movies = dataservice.cache.get('movies'); // TODO movies Provider
        	console.log(movies);
        	// $timeout(function() {
        	// 	for (var i = 0; i < movies.length; i++) {
        	// 		var movie = movies[i];
        	// 		if (movie.Title ) {}
        	// 	}
        	// }, 1000)
        }
	}

})();
(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('MembercardController', MembercardController);

	MembercardController.$inject = ['$rootScope', '$filter', 'dataservice', 'date'];
	/* @ngInject */
	function MembercardController($rootScope, $filter, dataservice, date) {
		var vm = this;
		var members = [];
		var movies = [];
		var addedMovies = [];
        
        $rootScope.clickEvent = clickEvent;

        vm.hideMember = hideMember;
        vm.member = {};
        vm.movieSearch = '';
        vm.searchedMovies = [];
        vm.searchMovies = searchMovies;
        vm.addMovie = addMovie;

        // TODO date factory for assigning movie to a member

        activate();

        function activate() {
        	dataservice.getMovies().then(function(data) {
        		return movies = data;
        	});
        }

        function addMovie(clickedMovie) {
        	var nthMovie = {
        		currentDate: date.currentDate(),
        		titleToAdd: clickedMovie.Title
        	};
        	
        	addedMovies.push(nthMovie);
        }

        function hideMember() {
            $rootScope.showMember = false;
            vm.movieSearch = '';
            vm.searchedMovies = [];
            // console.log(vm.member._id);
            if (addedMovies) {
            	dataservice.updateMember(addedMovies, vm.member._id);
            	addedMovies = [];
            }
        }

        function clickEvent() {
        	members = dataservice.cache.get('members');
            var memberIndex = dataservice.cache.get('memberIndex');

            vm.member = members[memberIndex];
            return vm.member;
        }

        function searchMovies() {
        	if (vm.movieSearch) {
        		vm.searchedMovies = $filter('NotRentedMovies')(movies, vm.movieSearch);
        	} else {
        		vm.searchedMovies = [];
        	}
        }
	}

})();
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
        vm.delMovie = delMovie;
        vm.movieCheck = false;
        vm.enableDel = enableDel;

        activate();

        function activate() {
        	dataservice.getMovies().then(function(data) {
        		return movies = data;
        	});
        }

        function addMovie(clickedMovie) {
        	var nthMovie = {
        		title: clickedMovie.Title,
        		currentDate: date.currentDate()
        	};
        	
        	addedMovies.push(nthMovie);
        }

        function delMovie() {

        }

        function enableDel() {
        	if (!vm.movieCheck) {
        		vm.movieCheck = true;
        	} else {
        		vm.movieCheck = false;
        	}
        }

        function hideMember() {
            $rootScope.showMember = false;
            vm.movieSearch = '';
            vm.searchedMovies = [];

            if (addedMovies.length) {
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
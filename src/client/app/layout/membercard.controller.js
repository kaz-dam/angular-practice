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
        var itemsToDel = [];
        var delInDb = false;
        
        $rootScope.clickEvent = clickEvent;

        vm.hideMember = hideMember;
        vm.member = {};
        vm.movieSearch = '';
        vm.searchedMovies = [];
        vm.searchMovies = searchMovies;
        vm.addMovie = addMovie;
        vm.delMovie = delMovie;
        vm.toggleButton = false;
        vm.enableDel = enableDel;

        activate();

        function activate() {
        	dataservice.getMovies().then(function(data) {
        		return movies = data;
        	});
        }

        function addMovie(clickedMovie) {
        	var nthMovie = {
        		id: clickedMovie._id,
        		title: clickedMovie.Title,
        		currentDate: date.currentDate()
        	};
        	vm.isRented[vm.searchedMovies.indexOf(clickedMovie)] = true;
        	addedMovies.push(nthMovie);
        	dataservice.movieRented(clickedMovie._id, true);
        }

        function delMovie() {
        	var counter = 0;
        	var notMoreRented = [];

        	if (itemsToDel.length > 1) {
        		itemsToDel.forEach(function(item, index) {
	        		if (item) {
	        			notMoreRented.push(vm.member.rentedMovies[index].id);
	        			console.log(notMoreRented);
	        			// vm.member.rentedMovies.splice(index, 1);

	        			delete vm.member.rentedMovies[index]; // TODO --> duplicate in ngRepeat
	        		}
	        	});
	        	dataservice.movieRented(notMoreRented, false);
        	} else {
        		dataservice.movieRented(vm.member.rentedMovies[0].id, false);
        		vm.member.rentedMovies = [];
        	}
        	// if (counter === itemsToDel.length) {
        	// 	vm.member.rentedMovies = [];
        	// }
        	// dataservice.movieRented(notMoreRented, false);
        	vm.toggleButton = false;
        	delInDb = true;
        	vm.checkbox = {};
        }

        function enableDel() {
        	var counter = 0;
        	itemsToDel = [];

        	for (var i = 0; i < vm.member.rentedMovies.length; i++) {
        		if (vm.checkbox[i]) {
	        		counter++;
	        	}
        		itemsToDel.push(vm.checkbox[i]);
        	}

        	if (counter > 0) {
        		vm.toggleButton = true;
        	} else {
        		vm.toggleButton = false;
        	}
        }

        function hideMember() {
            $rootScope.showMember = false;
            vm.movieSearch = '';
            vm.searchedMovies = [];
            vm.toggleButton = false;
            vm.checkbox = {};

            if (addedMovies.length) {
            	dataservice.updateMember(addedMovies, vm.member._id);
            	addedMovies = [];
            } else if (delInDb) {
            	dataservice.updateMember(vm.member.rentedMovies, vm.member._id);
            }
        }

        function clickEvent() {
        	members = dataservice.cache.get('members');
            var memberIndex = dataservice.cache.get('memberIndex');

            vm.member = members[memberIndex];
            return vm.member;
        }

        function searchMovies() {
        	vm.isRented = [];
        	if (vm.movieSearch) {
        		vm.searchedMovies = $filter('NotRentedMovies')(movies, vm.movieSearch);
        	} else {
        		vm.searchedMovies = [];
        	}
        }
	}

})();
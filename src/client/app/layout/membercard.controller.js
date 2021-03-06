(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('MembercardController', MembercardController);

	MembercardController.$inject = ['$rootScope', '$filter', 'dataservice', 'date', 'logger'];
	/* @ngInject */
	function MembercardController($rootScope, $filter, dataservice, date, logger) {
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
        vm.hours = [];

        activate();

        function activate() {
        	dataservice.getMovies().then(function(data) {
        		movies = data;
                return movies;
        	});
        }

        function addMovie(clickedMovie) {
            var currentDate = date.currentDate();
        	var nthMovie = {
        		id: clickedMovie._id,
        		title: clickedMovie.Title,
        		currentDate: currentDate,
                deadLine: 86400000
        	};
        	vm.isRented[vm.searchedMovies.indexOf(clickedMovie)] = true;
        	addedMovies.push(nthMovie);
        	dataservice.movieRented(clickedMovie._id, true);
        }

        function delMovie() {
        	var notMoreRented = [];
        	var keepAsRented = [];

    		itemsToDel.forEach(function(item, index) {
        		if (item) {
        			notMoreRented.push(vm.member.rentedMovies[index].id);
        		} else {
        			keepAsRented.push(vm.member.rentedMovies[index]);
        		}
        	});
        	vm.member.rentedMovies = keepAsRented;
        	dataservice.movieRented(notMoreRented, false);
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
            	dataservice.updateMember(addedMovies, vm.member._id).then(function() {
                    dataservice.getPeople(true).then(function() {
                        logger.info('Movie(s) added');
                    });
                });
            	addedMovies = [];
            } else if (delInDb) {
            	dataservice.updateMember(vm.member.rentedMovies, vm.member._id).then(function() {
                    dataservice.getPeople(true).then(function() {
                        delInDb = false;
                        logger.info('Movie(s) deleted');
                    });
                });
            }
        }

        function clickEvent() {
            vm.hours = [];
        	members = dataservice.cache.get('members');
            var memberIndex = dataservice.cache.get('memberIndex');

            vm.member = members[memberIndex];
            timing(vm.member.rentedMovies);
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

        function timing(membersMovies) {
            var dateObj = date.currentDate();

            for (var i = 0; i < membersMovies.length; i++) {
                var isoToJsDate = +new Date(membersMovies[i].currentDate);

                vm.hours.push(Math.floor(
                    ( membersMovies[i].deadLine - 
                    (dateObj.getTime() - isoToJsDate)
                    ) / 3600000));

                if (vm.hours[i] <= 0) {
                    vm.hours[i] = 0;
                }
            }
        }
	}
})();
(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('MembercardController', MembercardController);

	MembercardController.$inject = ['$rootScope', '$filter', 'dataservice'];
	/* @ngInject */
	function MembercardController($rootScope, $filter, dataservice) {
		var vm = this;
		var members = [];
		var movies = [];
        
        $rootScope.clickEvent = clickEvent;

        vm.hideMember = hideMember;
        vm.member = {};
        vm.movieSearch = '';
        vm.searchedMovies = [];
        vm.searchMovies = searchMovies;

        activate();

        function activate() {
        	dataservice.getMovies().then(function(data) {
        		return movies = data;
        	});
        }

        function hideMember() {
            $rootScope.showMember = false;
            vm.movieSearch = '';
            vm.searchedMovies = [];
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
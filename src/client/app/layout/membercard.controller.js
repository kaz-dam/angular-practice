(function() {
	'use strict';

	angular
		.module('app.layout')
		.controller('MembercardController', MembercardController);

	MembercardController.$inject = ['$rootScope', 'dataservice'];
	/* @ngInject */
	function MembercardController($rootScope, dataservice) {
		var vm = this;
		var members = {};
        
        $rootScope.clickEvent = clickEvent;

        vm.hideMember = hideMember;
        vm.member = {};

        function hideMember() {
            $rootScope.showMember = false;
        }

        function clickEvent() {
        	members = dataservice.cache.get('members');
            var memberIndex = dataservice.cache.get('memberIndex');

            vm.member = members[memberIndex];
            return vm.member;
        }
	}

})();
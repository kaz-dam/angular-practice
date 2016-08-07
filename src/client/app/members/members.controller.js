(function() {
    'use strict';
    
    angular.module('app.members')
        .controller('MembersController', MembersController);

    MembersController.$inject = ['$q', '$rootScope', 'dataservice', 'logger'];
    
    /* @ngInject */
    function MembersController($q, $rootScope, dataservice, logger) {
        var vm = this;

        $rootScope.showMember = false;

        vm.showMemberDetail = showMemberDetail;
        vm.currentPage = 1;
        vm.pageSize = 16;
        vm.title = 'Members';
        vm.hideForm = 'collapse';
        vm.newPerson = {};
        vm.onSubmit = onSubmit;
        vm.updateCache = updateCache;
        vm.searchMembers = '';
        vm.members = [];

        activate();

        function activate() {
            getMembers()
                .then(function() {
                    logger.info('Activated Members View');
            });
        }

        function getMembers() {
            return dataservice.getPeople().then(function(data) {
                vm.members = data;
                return vm.members;
            });
        }

        function onSubmit() {
            var newPerson = vm.newPerson;
            $q.when(dataservice.setPeople(newPerson))
                .then(function() {
                    logger.info('New member saved');
                });
        }

        function updateCache() {
            return dataservice.getPeople(true).then(function(data) {
                vm.members = data;
                return vm.members;
            });
        }

        function showMemberDetail(member) {
            $rootScope.showMember = true;
            dataservice.cache.put('memberIndex', vm.members.indexOf(member));

            $rootScope.clickEvent();
        }
    }
})();
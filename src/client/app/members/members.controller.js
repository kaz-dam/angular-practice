(function() {
    'use strict';
    
    angular.module('app.members')
        .controller('MembersController', MembersController);

    MembersController.$inject = ['$q', 'dataservice', 'logger'];
    
    /* @ngInject */
    function MembersController($q, dataservice, logger) {
        var vm = this;

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
            var members = dataservice.cache.get('members');
            var defer = $q.defer();

            defer.resolve(membersResolver(members));
            return defer.promise;
        }

        function onSubmit() {
            setPeople()
                .then(function() {
                    logger.info('New member saved');
                });
        }

        function setPeople() {
            var defer = $q.defer();
            var newPerson = vm.newPerson;

            defer.resolve(dataservice.setPeople(newPerson));
            return defer.promise;
        }

        function membersResolver(obj) {
            if (obj) {
                vm.members = obj;
                return vm.members;
            } else {
                dataservice.getPeople().then(function(data) {
                    vm.members = data;
                    return vm.members;
                });
            }
        }

        function updateCache() {
            return dataservice.getPeople().then(function(data) {
                vm.members = data;
                return vm.members;
            });
        }
    }
})();
(function() {
    'use strict';
    
    angular.module('app.members')
        .controller('MembersController', MembersController);

    MembersController.$inject = ['$q', '$cacheFactory', 'dataservice', 'logger'];
    
    /* @ngInject */
    function MembersController($q, $cacheFactory, dataservice, logger) {
        var refresh = false;
        var vm = this;

        vm.title = 'Members';
        vm.hideForm = 'collapse';
        vm.newPerson = {};
        vm.onSubmit = onSubmit;
        vm.getMembers = getMembers;
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
            console.log(dataservice.cache.get('members'));
            return dataservice.getPeople().then(function(data) {
                vm.members = data;
                return vm.members;
            });
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

        // function updateCache() {
        //     refresh = true;
        //     console.log(dataservice.updateCache());
        // }
    }
})();
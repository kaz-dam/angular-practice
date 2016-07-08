(function() {
    'use strict';
    
    angular.module('app.members')
        .controller('MembersController', MembersController);

    MembersController.$inject = ['$q', 'dataservice', 'logger'];
    
    /* @ngInject */
    function MembersController($q, dataservice, logger) {
        var vm = this;
        vm.title = 'Members';
        vm.newPerson = {};
        vm.onSubmit = onSubmit;

        activate();

        function activate() {
            logger.info('Activated Members View');
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
            console.log(newPerson);

            defer.resolve(dataservice.setPeople(newPerson));
            return defer.promise;
        }
    }
})();
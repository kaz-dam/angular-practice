(function() {
    'use strict';
    
    angular.module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$q', 'dataservice', 'logger'];
    
    /* @ngInject */
    function UsersController($q, dataservice, logger) {
        var vm = this;
        vm.title = 'Users';
        vm.newPerson = {};
        vm.onSubmit = onSubmit;

        activate();

        function activate() {
            logger.info('Activated Users View');
        }

        function onSubmit() {
            setPeople()
                .then(function() {
                    logger.info('New user saved');
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
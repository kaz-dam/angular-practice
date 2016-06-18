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
        // vm.formObjects = formObjects();

        activate();

        function activate() {
            logger.info('Activated Users View');
        }

        function onSubmit() {
            var newPerson = vm.newPerson;
            console.log(newPerson);
            dataservice.setPeople(newPerson);
        }

    }
})();
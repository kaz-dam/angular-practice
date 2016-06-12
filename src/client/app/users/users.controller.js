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
        vm.formObjects = formObjects;

        activate();

        function activate() {
            logger.info('Activated Users View');
        }

        function onSubmit() {
            var newPerson = vm.newPerson;
            console.log(newPerson);
            dataservice.setPeople(newPerson);
        }

        function formObjects() {
            return {
                fgClass: '',
                labelFor: 'inputFirstName',
                labelClass: 'col-sm-2',
                label: 'First Name',
                inputDivClass: 'col-sm-10',
                inputName: 'firstName',
                inputType: 'text',
                model: vm.newPerson.firstName,
                autocomplete: 'off'
            };
        }
    }
})();
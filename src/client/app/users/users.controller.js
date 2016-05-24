(function() {
    'use strict';

    angular.module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['logger'];
    
    /* @ngInject */
    function UsersController(logger) {
        var vm = this;
        vm.title = 'Users';

        activate();

        function activate() {
            logger.info('Activated Users View');
        }
    }
})();
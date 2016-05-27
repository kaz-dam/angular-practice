(function() {
    'use strict';

    angular.module('app.users')
        .controller('UsersController', UsersController);

    UsersController.$inject = ['$q', 'dataservice', 'logger'];
    
    /* @ngInject */
    function UsersController($q, dataservice, logger) {
        var vm = this;
        vm.title = 'Users';

        activate();

        function activate() {
            logger.info('Activated Users View');
        }
    }
})();
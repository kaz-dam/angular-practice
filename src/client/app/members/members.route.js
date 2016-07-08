(function() {
    'use strict';
    
    angular
        .module('app.members')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'members',
                config: {
                    url: '/members',
                    templateUrl: 'app/members/members.html',
                    controller: 'MembersController',
                    controllerAs: 'vm',
                    title: 'Members',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-user"></i> Members'
                    }
                }
            }
        ];
    }
})();
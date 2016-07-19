(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger) {
    var vm = this;
    vm.news = {
      title: 'Rental time counter',
      description: 'Movies that need to be brought back within an hour'
    };
    vm.messageCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';

    activate();

    function activate() {
      var promises = [getMessageCount(), getPeople()];
      return $q.all(promises).then(function() {
        logger.info('Activated Dashboard View');
      });
    }

    // TODO Number of rented movies
    function getMessageCount() {
      return dataservice.getMessageCount().then(function(data) {
        vm.messageCount = data;
        return vm.messageCount;
      });
    }

    function getPeople() {
      var members = dataservice.cache.get('members');
      var defer = $q.defer();

      defer.resolve(membersResolver(members));
      return defer.promise;
    }

    function membersResolver(obj) {
            if (obj) {
                vm.people = obj;
                return vm.people;
            } else {
                dataservice.getPeople().then(function(data) {
                    vm.people = data;
                    return vm.people;
                });
            }
        }
  }
})();

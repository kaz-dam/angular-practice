(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', '$cacheFactory', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, $cacheFactory, exception, logger) {
    var service = {
      getPeople: getPeople,
      setPeople: setPeople,
      getMessageCount: getMessageCount
    };

    var membersCache = $cacheFactory('membersCache');

    var config = {
      cache: membersCache
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function setPeople(data) {
      $http.post('/api/setPeople', data)
          .then(success)
          .catch(fail);
    }

    function getPeople() {
      return $http.get('/api/people', config)
        .then(success)
        .catch(fail);
    }

    function success(response) {
      return response.data;
    }

    function fail(e) {
      return exception.catcher('XHR Failed for getPeople')(e);
    }
  }
})();

(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('dataservice', dataservice);

  dataservice.$inject = ['$http', '$q', '$cacheFactory', 'exception', 'logger'];
  /* @ngInject */
  function dataservice($http, $q, $cacheFactory, exception, logger) {
    
    var cache = $cacheFactory('cache');
    var service = {
      getPeople: getPeople,
      getMovies: getMovies,
      setPeople: setPeople,
      getMessageCount: getMessageCount,
      cache: cache
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function setPeople(data) {
      $http.post('/api/setPeople', data)
          .then(success)
          .catch(fail);
    }

    function getPeople() {
      return $http.get('/api/people')
        .then(success)
        .catch(fail);
    }

    function getMovies() {
      return $http.get('/api/movies')
        .then(function(res) {
          cache.put('movies', res.data)
          return res.data;
        })
        .catch(fail);
    }

    function success(response) {
      cache.put('members', response.data);
      return response.data;
    }

    function fail(e) {
      return exception.catcher('XHR Failed for getPeople')(e);
    }
  }
})();

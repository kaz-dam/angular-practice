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
      cache: cache,
      updateMember: updateMember,
      movieRented: movieRented
    };

    return service;

    function getMessageCount() { return $q.when(72); }

    function setPeople(data) {
      $http.post('/api/setPeople', data)
          .then(success)
          .catch(fail);
    }

    function getPeople(forceRefresh) {
      if (cache.get('members') && !forceRefresh) {
        return $q.when(cache.get('members'));
      } else {
        return $http.get('/api/people')
          .then(success)
          .catch(fail);
      }
    }

    function getMovies() {
      if (cache.get('movies')) {
        return $q.when(cache.get('movies'));
      } else {
        return $http.get('/api/movies')
        .then(function(res) {
          cache.put('movies', res.data)
          return res.data;
        })
        .catch(fail);
      }
    }

    function updateMember(addedMovies, memberId) {
      var update = {
        id: memberId,
        movies: addedMovies
      };

      $http.post('/api/updateMember', update)
        .then(function(res) {
          return res;
        })
        .catch(fail);
    }

    function movieRented(clickedMovieId, rented) {
      var obj = {
        id: clickedMovieId,
        rented: rented
      };

      $http.post('/api/movieRented', obj)
        .then(function(res) {
          var movieCache = cache.get('movies');
          for (var i = 0; i < movieCache.length; i++) {
            if (movieCache[i]._id === res.data._id) {
              movieCache[i] = res.data;
            }
          }
          cache.put('movies', movieCache);
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

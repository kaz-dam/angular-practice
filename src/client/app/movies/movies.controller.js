(function() {
  'use strict';

  angular
    .module('app.movies')
    .controller('MoviesController', MoviesController);

  MoviesController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function MoviesController($q, dataservice, logger) {
    var vm = this;
    vm.movies = [];
    vm.title = 'Movie Database';

    activate();

    function activate() {
      getMovies()
        .then(function() {
          logger.info('Activated Movies View');
        });
    }

    function getMovies() {
      var movies = dataservice.cache.get('movies');
      var defer = $q.defer();

      defer.resolve(moviesResolver(movies));
      return defer.promise;
    }

    function moviesResolver(obj) {
      if (obj) {
          vm.movies = obj;
          return vm.movies;
      } else {
          dataservice.getMovies().then(function(data) {
              vm.movies = data;
              return vm.movies;
          });
      }
    }
  }
})();

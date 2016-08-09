(function() {
  'use strict';

  angular
    .module('app.movies')
    .controller('MoviesController', MoviesController);

  MoviesController.$inject = ['$q', 'dataservice', 'logger'];
  /* @ngInject */
  function MoviesController($q, dataservice, logger) {
    var vm = this;

    vm.currentPage = 1;
    vm.pageSize = 8;
    vm.movies = [];
    vm.searchCriteria = {
      $: '',
      Title: '',
      Director: '',
      Actors: '',
      Genre: '',
      Year: ''
    }
    vm.releaseDates = [];
    vm.title = 'Movie Database';

    activate();

    function activate() {
      var promises = [getMovies(), dates()];
      return $q.all(promises)
        .then(function() {
          logger.info('Activated Movies View');
        });
    }

    // TODO date factory
    function dates() {
      var defer = $q.defer();

      defer.resolve(dateResolver());
      return defer.promise;
    }

    function dateResolver() {
      var from = 1950,
          to = 2016;

      for (var i = from; i < to; i++) {
        vm.releaseDates[i - from] = i;
      }
      return vm.releaseDates;
    }

    function getMovies() {
      return dataservice.getMovies().then(function(data) {
          vm.movies = data;
          return vm.movies;
      });
    }
  }
})();

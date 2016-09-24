(function() {
  'use strict';

  angular
    .module('app.movies')
    .controller('MoviesController', MoviesController);

  MoviesController.$inject = ['$q', '$rootScope', 'dataservice', 'logger', 'date'];
  /* @ngInject */
  function MoviesController($q, $rootScope, dataservice, logger, date) {
    var vm = this;

    $rootScope.showMovie = false;

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
    };
    vm.showMovieDetail = showMovieDetail;
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

    function dates() {
      var defer = $q.defer();

      defer.resolve(dateResolver());
      return defer.promise;
    }

    function dateResolver() {
      var from = 1950,
          to = date.currentDate().getFullYear();

      for (var i = from; i <= to; i++) {
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

    function showMovieDetail(movie) {
      $rootScope.showMovie = true;
      dataservice.cache.put('movieIndex', vm.movies.indexOf(movie));

      $rootScope.movieClicked();
    }
  }
})();

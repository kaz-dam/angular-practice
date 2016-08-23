(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q', 'dataservice', 'logger', 'date'];
  /* @ngInject */
  function DashboardController($q, dataservice, logger, date) {
    var vm = this;
    var movies = [];
    vm.news = {
      title: 'Rental time counter',
      description: 'Movies that need to be brought back within an hour'
    };
    vm.movieCount = 0;
    vm.people = [];
    vm.title = 'Dashboard';
    vm.currentDate = date.currentDate();

    activate();

    function activate() {
      var promises = [getMovies(), getPeople()];
      return $q.all(promises).then(function() {
        getMovieCount();
        logger.info('Activated Dashboard View');
      });
    }

    function getMovies() {
      return dataservice.getMovies().then(function(data) {
        movies = data;
        return movies;
      });
    }

    function getPeople() {
      return dataservice.getPeople().then(function(data) {
          vm.people = data;
          return vm.people;
      });
    }

    function getMovieCount() {
      for (var i = 0; i < movies.length; i++) {
        if (movies[i].rented) {
          vm.movieCount++;
        }
      }
      return vm.movieCount;
    }
  }
})();

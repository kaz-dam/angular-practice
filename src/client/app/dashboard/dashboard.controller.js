(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q','$filter', 'dataservice', 'logger', 'date', 'timer'];
  /* @ngInject */
  function DashboardController($q, $filter, dataservice, logger, date, timer) {
    var vm = this;
    var movies = [];
    var currentDate = date.currentDate();

    vm.news = {
      title: 'Rental time counter',
      description: 'Movies that need to be brought back within an hour'
    };
    vm.movieCount = 0;
    vm.membersWithMovies = [];
    vm.rentedMovieObjects = [];
    vm.title = 'Dashboard';
    vm.currentDate = currentDate;
    vm.timeDistinction = [];
    vm.warning = false;
    vm.alert = false;

    activate();

    function activate() {
      var promises = [getMovies(), getPeople()];
      return $q.all(promises).then(function() {
        getMovieCount();
        getRentedMovieObjects();
        getTimer();
        logger.info('Activated Dashboard View');
        console.log(vm.membersWithMovies);
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
          vm.membersWithMovies = $filter('rentFilter')(data);
          return vm.membersWithMovies;
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

    function getRentedMovieObjects() {
      vm.membersWithMovies.forEach(function(data) {
        for (var i = 0; i < data.rentedMovies.length; i++) {
          vm.rentedMovieObjects.push(data.rentedMovies[i]);
        }
      });
    }

    function getTimer() {
      var currentTime = currentDate.getTime();
      for (var i = 0; i < vm.rentedMovieObjects.length; i++) {
        vm.timeDistinction.push(vm.rentedMovieObjects[i].deadLine - currentTime);

        if (vm.timeDistinction[i] <= 3600000 && vm.timeDistinction[i] >= 1800000) {
          vm.warning = true;
        } else {
          if (vm.timeDistinction[i] >= 3600000) {
            vm.warning = false;
            vm.alert = false;
          } else {
            vm.warning = false;
            vm.alert = true;
          }
        }
      }
      timer.getTimer(vm.timeDistinction);
    }
  }
})();

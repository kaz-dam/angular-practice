(function() {
  'use strict';

  angular
    .module('app.dashboard')
    .controller('DashboardController', DashboardController);

  DashboardController.$inject = ['$q','$filter', '$interval', 'dataservice', 'logger', 'date', 'timer'];
  /* @ngInject */
  function DashboardController($q, $filter, $interval, dataservice, logger, date, timer) {
    var vm = this;
    var movies = [];
    var currentDate = date.currentDate();
    var timerPromise = [];

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
    vm.timerView = [];
    vm.warning = false;
    vm.alert = false;

    activate();

    function activate() {
      var promises = [getMovies(), getPeople()];
      return $q.all(promises).then(function() {
        getMovieCount();
        getRentedMovieObjects();
        getTimerObj();
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

        // for (var i = 0; i < vm.rentedMovieObjects.length; i++) {

        //   var id = vm.rentedMovieObjects[i].id;

        //   for (var i = 0; i < data.rentedMovies.length; i++) {
        //     if (id !=== data.rentedMovies[i].id) {
        //       vm.rentedMovieObjects.push(data.rentedMovies[i]);
        //     }
        //   }
          
        // }
        for (var i = 0; i < data.rentedMovies.length; i++) {
          vm.rentedMovieObjects.push(data.rentedMovies[i]);
        }
      });
    }

    function getTimerObj() {
      var currentTime = currentDate.getTime();
      for (var i = 0; i < vm.rentedMovieObjects.length; i++) {
        // vm.timeDistinction.push(Math.ceil((vm.rentedMovieObjects[i].deadLine - currentTime) / 1000));
        var isoToJsDate = +new Date(vm.rentedMovieObjects[i].currentDate);

        // console.log(vm.rentedMovieObjects[i].currentDate);
        vm.timeDistinction.push(Math.ceil(
          ( vm.rentedMovieObjects[i].deadLine - 
            (currentTime - isoToJsDate)
            ) / 1000));

        if (vm.timeDistinction[i] <= 3600 && vm.timeDistinction[i] >= 1800) {
          vm.warning = true;
        } else {
          if (vm.timeDistinction[i] >= 3600) {
            vm.warning = false;
            vm.alert = false;
          } else {
            vm.warning = false;
            vm.alert = true;
          }
        }
      }
        $interval(function() {
          for (var i = 0; i < vm.timeDistinction.length; i++) {
            if (vm.timeDistinction[i] <= 0) {
                vm.timeDistinction[i] = 0;
            } else {
              vm.timeDistinction[i] = vm.timeDistinction[i] - 1;
              var hour = Math.ceil(vm.timeDistinction[i] / 60 / 60);
              var minute = Math.ceil(vm.timeDistinction[i] / 60 % 60);
              var second = Math.ceil(vm.timeDistinction[i] % 60);

              vm.timerView[i] = hour + ' Hours, ' + minute + ' Minutes, ' + second + ' Seconds';
              // return returnedObjs;
              // console.log(vm);
            }
          }
        }, 1000);
        // vm.timer = timer.getTimer(i, vm.timeDistinction);
        // var format = timer.getTimer(vm.timeDistinction, i);
        // vm.timer.push(format);
    }
  }
})();

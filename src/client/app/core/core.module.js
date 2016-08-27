(function() {
  'use strict';

  angular
    .module('app.core', [
      'ngAnimate', 'ngSanitize',
      'blocks.exception', 'blocks.logger', 'blocks.router', 'blocks.filters', 'blocks.date', 'blocks.timer',
      'ui.router', 'ngplus'
    ]);
})();

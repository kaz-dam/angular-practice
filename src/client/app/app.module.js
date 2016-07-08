(function() {
  'use strict';

  angular.module('app', [
  	// ng modules
    'ngAnimate',
  	// third party modules
  	'jcs-autoValidate',

  	// custom modules
  	'app.core',
  	'app.widgets',
  	'app.movies',
  	'app.dashboard',
  	'app.layout',
  	'app.members'
  ]);

})();

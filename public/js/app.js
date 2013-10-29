'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',


'ui.bootstrap',
  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/projects', {
      templateUrl: 'partials/partial1',
      controller: 'ProjectsCtrl'
    }).
    when('/models', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/experiments', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/runs', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    otherwise({
      redirectTo: '/projects'
    });

  $locationProvider.html5Mode(true);
});

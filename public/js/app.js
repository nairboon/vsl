'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',


'ui.bootstrap',
'restangular',
'ngGrid',
  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/projects', {
      templateUrl: 'partials/projects',
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
}).config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
RestangularProvider.setRestangularFields({
  id: "_id"
});
});

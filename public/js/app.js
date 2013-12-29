'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',

'ngRoute',
'ui.bootstrap',
'restangular',
//'ngGrid',
  // 3rd party dependencies
  'btford.socket-io'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/projects', {
      templateUrl: 'partials/projects',
      controller: 'ProjectOverviewCtrl'
    }).
    when('/addProject', {
      templateUrl: 'partials/addProject',
      controller: 'AddProjectCtrl'
    }).
    when('/projects2', {
      templateUrl: 'partials/projects',
      controller: 'ProjectOverviewCtrl'
    }).
    when('/models', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
    when('/projects/:project', {
      templateUrl: 'partials/ProjectsDetailView',
      controller: 'ProjectDetailCtrl'
    }).
    when('/runs', {
      templateUrl: 'partials/partial2',
      controller: 'MyCtrl2'
    }).
     when('/index', {
      templateUrl: 'partials/index',
      controller: 'IndexCtrl'
    }).
    otherwise({
      redirectTo: '/index'
    });

  $locationProvider.html5Mode(true);
}).config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api');
RestangularProvider.setRestangularFields({
  id: "_id"
});
});

'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('ProjectsCtrl', function ($scope, socket, Restangular) {
	var projects = Restangular.all('projects');
$scope.allProjects = projects.getList();
console.log(projects);
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });
  }).
  controller('NavCtrl',['$scope','$location','$route','$routeParams', function($scope,$location,$route, $routeParams) {
    // write Ctrl here
console.log($routeParams);
  }]);

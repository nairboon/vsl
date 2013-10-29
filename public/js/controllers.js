'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('ProjectsCtrl', function ($scope, socket, Restangular) {
	$scope.projects = Restangular.all('projects');
$scope.allProjects = $scope.projects.getList();


  var cellEditableTemplate = "<input style=\"width: 90%\" step=\"any\" ng-class=\"'colt' + col.index\" ng-input=\"COL_FIELD\" ng-blur=\"updateEntity(col, row, cellValue)\" ng-model='cellValue'/>";

  $scope.cellValue = null;

$scope.gridOptions = { data: 'allProjects', columnDefs: [{ field: 'name',visible: true, enableCellEdit: true, editableCellTemplate: cellEditableTemplate},
{ field: '_id',visible: true}] };

$scope.updateEntity = function(column, row, cellValue) {
    console.log(row.entity);
    console.log(column.field);
    console.log('Cell Value prior: ' + row.entity[column.field]);
    console.log('Cell Value after: ' + cellValue);
    
    // back end logic to update new cell value
row.entity.name = cellValue
row.entity.put()
    // Upon sucessfull back end update 
    //row.entity[column.field] = cellValue;
  };


console.log($scope.projects);
    socket.on('send:time', function (data) {
      $scope.time = data.time;
    });

 $scope.newProject = function(){
	$scope.projects.post({name:"Unnamed Project"})
$scope.allProjects = $scope.projects.getList();
};
  }).
  controller('NavCtrl',['$scope','$location','$route','$routeParams', function($scope,$location,$route, $routeParams) {
    // write Ctrl here
console.log($routeParams);
  }]);

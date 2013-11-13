'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, socket) {
    socket.on('send:name', function (data) {
      $scope.name = data.name;
    });
  }).
  controller('ProjectOverviewCtrl', function ($scope, socket, Restangular) {
  	$scope.projects_api = Restangular.all('projects');
var Projects = $scope.allProjects = $scope.projects_api.getList();
console.log($scope.allProjects)
          $scope.editedProject = null;
          
    $scope.addProject = function () {
                var newProject = $scope.newProject.trim();
                if (!newProject.length) {
                        return;
                }

                Projects.push({
                        title: newProject,
                        completed: false
                });

                $scope.newProject = '';
        };

        $scope.editProject = function (Project) {
                $scope.editedProject = Project;
                // Clone the original Project to restore it on demand.
                $scope.originalProject = angular.extend({}, Project);
        };

        $scope.doneEditing = function (Project) {
                $scope.editedProject = null;
                Project.title = Project.title.trim();

                if (!Project.title) {
                        $scope.removeProject(Project);
                }
        };

        $scope.revertEditing = function (Project) {
                Projects[Projects.indexOf(Project)] = $scope.originalProject;
                $scope.doneEditing($scope.originalProject);
        };

        $scope.removeProject = function (Project) {
                Projects.splice(Projects.indexOf(Project), 1);
        };
  
  
  
/*

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
};*/
  }).
controller('ProjectDetailCtrl',['$scope','$location','$route','$routeParams', function($scope,$location,$route, $routeParams) {
    $scope.projects = Restangular.all('projects');

console.log($routeParams);
  }]).
  controller('NavCtrl',['$scope','$location','$route','$routeParams', function($scope,$location,$route, $routeParams) {
    // write Ctrl here
console.log($routeParams);
  }]);

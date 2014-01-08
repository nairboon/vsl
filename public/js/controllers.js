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
 
$scope.updateProjects = function() {
var ap = $scope.projects_api.getList();
ap.then(function(data) {
   $scope.allProjects = data;

})

}
$scope.updateProjects()

          $scope.editedProject = null;
          
    $scope.addProject = function () {
                var newProject = $scope.newProject.trim();
                if (!newProject.length) {
                        return;
                }
console.log(newProject)
             	$scope.projects_api.post({name:newProject})
		$scope.updateProjects()


                $scope.newProject = '';
        };

        $scope.editProject = function (Project) {
                $scope.editedProject = Project;
                // Clone the original Project to restore it on demand.
                $scope.originalProject = angular.extend({}, Project);
        };

        $scope.doneEditing = function (Project) {
                $scope.editedProject = null;
                Project.name = Project.name.trim();
		Project.put()
                if (!Project.name) {
                        $scope.removeProject(Project);
                }
        };

        $scope.revertEditing = function (Project) {
                Projects[Projects.indexOf(Project)] = $scope.originalProject;
                $scope.doneEditing($scope.originalProject);
        };

        $scope.removeProject = function (Project) {
                $scope.allProjects.splice($scope.allProjects.indexOf(Project), 1);
		Project.remove()
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
controller('ProjectDetailCtrl',['$scope','$location','$route','$routeParams', 'Restangular', function($scope,$location,$route, $routeParams, Restangular) {
    var p = Restangular.one('projects',$routeParams.project).get();

p.then(function(data) {
   $scope.project = data;
   //console.log(data,$scope.project)
})

console.log($routeParams);

  }]).
  controller('IndexCtrl',['$scope','$location','$route','$routeParams', 'Restangular','socket','$interval', function($scope,$location,$route, $routeParams, Restangular,socket,$interval) {
    $scope.model_api = Restangular.all('model')
    
    $scope.journal = []
    $scope.vis = {speed: 2,runs: 0};

var simulation;

$scope.showVisualization = function () {

if(angular.isDefined(simulation)) {
 $interval.cancel(simulation);
  $scope.vis.runs = 0
}
 console.log("running the visualization")

  simulation = $interval(function() {
// update the graph
        $scope.vis.runs++
        
        if($scope.vis.runs >= $scope.journal.length) {
         $interval.cancel(simulation);
         return
        }


  }, 1000/$scope.vis.speed); // the greater the speed, the faster the view is updated
 }
 
 $scope.$watch('vis.runs', function (newVal, oldVal) {

  console.log("redrawing the visualization")

  $scope.gvnodes = $scope.journal[newVal]
 })

    var p = $scope.model_api.getList();

p.then(function(data) {
   $scope.model = data;
   //console.log(data)
})

 $scope.runModel = function () {
  $scope.journal.length = 0
 console.log("running model")
 //$scope.model_api.customPOST({model: $scope.model},"run")
 $scope.model_api.post({model: $scope.model},$scope.showVisualization)

 }

    socket.on('model:journal', function (data) {
    
      $scope.journal.push(data);
       $scope.TotalRuns = $scope.journal.length
      console.log("got some data",data)
    });
    
//console.log($routeParams);

  }]).
  controller('NavCtrl',['$scope','$location','$route','$routeParams', function($scope,$location,$route, $routeParams) {
  
  $scope.$on('$routeChangeSuccess', function(ev,rd) {
  	//console.log("pro:",rd.params.project)
  	if(rd.params.project !== undefined) {
    console.log("in project:")
    //$scope.project = {}
      $scope.project = $routeParams.project;
  	}
  })
  //console.log("out pro",$routeParams)
  

    // write Ctrl here
//console.log("po:",$routeParams.project);
  }]);

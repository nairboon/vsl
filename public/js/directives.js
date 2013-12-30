'use strict';

/* Directives */

var myApp = angular.module('myApp.directives', [])

myApp.directive('appVersion', function (version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }).directive('ngBlur', function () {
  // AngularJS does not support the onBlur event (as well as the onFocus). 
  // However, this can be overcome by adding a "simple" directive.
  // http://stackoverflow.com/questions/15647981/angularjs-and-ng-grid-auto-save-data-to-the-server-after-a-cell-was-changed
  return function (scope, elem, attrs) {
    elem.bind('blur', function () {
      scope.$apply(attrs.ngBlur);
    });
  };
});

myApp.directive('projectFocus', function todoFocus($timeout) {
        return function (scope, elem, attrs) {
                scope.$watch(attrs.projectFocus, function (newVal) {
                        if (newVal) {
                                $timeout(function () {
                                        elem[0].focus();
                                }, 0, false);
                        }
                });
        };
});

myApp.directive('projectEscape', function () {
        var ESCAPE_KEY = 27;
        return function (scope, elem, attrs) {
                elem.bind('keydown', function (event) {
                        if (event.keyCode === ESCAPE_KEY) {
                                scope.$apply(attrs.projectEscape);
                        }
                });
        };
});

myApp.directive('projectBlur', function () {
        return function (scope, elem, attrs) {
                elem.bind('blur', function () {
                        scope.$apply(attrs.projectBlur);
                });
        };
});

myApp.directive('graphVisualization', function () {

  // constants
var width = 960,
    height = 500;
var color = d3.scale.category20();

  return {
    restrict: 'E',
    scope: {
      source: '=',
    },
    link: function (scope, element, attrs) {

var force = d3.layout.force()
    .charge(-120)
    .linkDistance(30)
    .size([width, height]);

      var svg = d3.select(element[0])
        .append("svg")
          .attr("width", width)
          .attr("height", height);
          

      scope.$watch('source', function (graph, oldVal) {

console.log("data changed:",graph)
        // clear the elements inside of the directive
        svg.selectAll('*').remove();

        // if 'val' is undefined, exit
        if (!graph) {
          return;
        }
        

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();

  var link = svg.selectAll(".link")
      .data(graph.links)
    .enter().append("line")
      .attr("class", "link")
      .style("stroke-width", function(d) { return Math.sqrt(d.value); });

  var node = svg.selectAll(".node")
      .data(graph.nodes)
    .enter().append("circle")
      .attr("class", "node")
      .attr("r", 5)
      .style("fill", function(d) { return color(d.Features[0]); })
      .call(force.drag);

  node.append("title")
      .text(function(d) { return d.name; });

  force.on("tick", function() {
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
});


  
      }
    }
  });

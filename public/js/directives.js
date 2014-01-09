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
    height = 500,
    scale = 50;
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
        
 var graph = {nodes: [], links:[]};
 

var first = true
  
  
      scope.$watch('source', function (newVal, oldVal) {
   if(newVal === undefined) { // update only if there is some data
   return
   }
console.log("data changed:",newVal)
        // clear the elements inside of the directive
        svg.selectAll('*').remove();

        // if 'val' is undefined, exit
        if (!newVal) {
          return;
        }


if(first ) {
first = false
graph.nodes = newVal.nodes;
graph.links = newVal.links;

  force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();
} else {
// just update the features & position

graph.nodes.forEach(function(el,i){
        el.Features = newVal.nodes[i].Features
        if (newVal.nodes[i].Agent.x !== undefined) {
                el.fixed = true
                el.x = newVal.nodes[i].Agent.x * scale + 40;
                el.y = newVal.nodes[i].Agent.y * scale + 40;
                el.px = el.x
                el.py = el.y
                console.log(el.x,el.y)
        }
        
})
//force.tick()
force.start()
}
// update the graph object


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

//  node.append("title")
  //    .text(function(d) { return d.x + "-" +d.y; });
      
       node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return "jajajaja" });

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

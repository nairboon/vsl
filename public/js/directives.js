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
var width = 900,
    height = 500,
    scale = 50;
var color = d3.scale.category20();

  return {
    restrict: 'E',
    scope: {
      source: '=',
      restart: '=',
    },
    link: function (scope, element, attrs) {

 var graph = {nodes: [], links:[]};
 
var force = d3.layout.force()
    .charge(-120)
    .nodes(graph.nodes)
      .links(graph.links)
    .linkDistance(30)
    .size([width, height]);



      var svg = d3.select(element[0])
        .append("svg")
          .attr("width", width)
          .attr("height", height);
          
           var fg = svg.append("g");
           
              var  redraw = function() {
  fg.attr("transform", "translate(" + d3.event.translate + ")" + " scale(" + d3.event.scale + ")")

}

          svg.call(d3.behavior.zoom().on("zoom", redraw));
        
    
function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}


var start = function() {
        var node = fg.selectAll(".node"),
    link = fg.selectAll(".link");
    
  link = link.data(force.links(), function(d) { 
  assert(typeof d.source.id === "number");
    assert(typeof d.target.id === "number");
    
  //console.log("d:",d.source.id, d.target.id, " max ", force.nodes().length)
  return d.source.id + "-" + d.target.id; });
  
  link.enter().insert("line", ".node").attr("class", "link");
  
  link.exit().remove();

  node = node.data(force.nodes(), function(d) { return d.id;});
  
  node.style("fill", function(d) { return color(d.Features[0]); });
  
  node.enter().append("circle").attr("class", function(d) { return "node " + d.id; }).attr("r", 5).call(force.drag);
  node.exit().remove();

console.log("force start")
  force.start();
  //console.log("starting force on", force.links().length, force.nodes().length)
}


  force.on("tick", function() {
        var node = fg.selectAll(".node"),
    link = fg.selectAll(".link");
        
    link.attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("cx", function(d) { return d.x; })
        .attr("cy", function(d) { return d.y; });
  });
  
 console.log("init d3.js")

var first = true
  
  scope.restart.resetVisualization = function() {
  console.log("reset vis")
  first = true
  fg.selectAll('*').remove();
  force.nodes([])
    force.nodes([])
  }

scope.$watch('source', function (newVal, oldVal) {
console.log("count:", force.links().length, " - ", force.nodes().length)
   if(newVal === undefined) { // update only if there is some data
   return
   }
//console.log("data changed:",newVal)
        // clear the elements inside of the directive
       // svg.selectAll('*').remove();

        // if 'val' is undefined, exit
        if (!newVal) {
          return;
        }

var findNode = function(id) {
    for (var i in force.nodes()) {
        if (force.nodes()[i]["id"] == id) return force.nodes()[i]
    };
    return null;
}


if(first ) {
first = false

 // graph.links.push({source: a, target: b}, {source: a, target: c}, {source: b, target: c});

 newVal.nodes.forEach(function(el,i){
  var n = {Features: el.Features, id: el.Agent.index}
 console.log("ADDING:",n,i)
    force.nodes().push( n);
 })
       start();
       //graph.links.pop()
 newVal.links.forEach(function(link,i){
        
        //var link = {source: force.nodes()[el.source], target: force.nodes()[el.target]}
        if(findNode(link.source)!= null && findNode(link.target)!= null) {        
        force.links().push ({
            "source":findNode(link.source),
            "target":findNode(link.target)
        })
    } else {
    console.log("1.st PAPAAPPASNIC:", link.source, link.target,findNode(link.source), findNode(link.target))
    }
    
// console.log(el, link)

 })
 
 //graph.nodes.push.apply(graph.nodes, newVal.nodes)
 // graph.links.push.apply(graph.links, newVal.links)
      start();
} else {
console.log("SECOND")
// just update the features & position & links
force.links([])
//start()

/*
//graph.linksnewVal.links);
graph.links = force.links();
//graph.links = [];

newVal.links.forEach(function(el,i){
// add new links


})
//force.links(graph.links)
//force.tick()
console.log(graph.links)
*/
//graph.links = []
//var link = {value: 1, source: findNode(0), target: findNode(1)}
//force.links().push(link)
//start()

 newVal.links.forEach(function(link,i){
        
        //var link = {source: graph.nodes[2], target: graph.nodes[3]}
 //console.log(el.source, el, link)
 
 if(findNode(link.source)!= null && findNode(link.target)!= null) {  
        var l = {
            "source":findNode(link.source),
            "target":findNode(link.target)
        }
       
        force.links().push (l)
       // console.log(l)
    } else {
    console.log("2. PAPAAPPASNIC:!! ", findNode(link.source), findNode(link.target), link.source, link.target)
    }
    
 })
// graph.links

force.nodes().forEach(function(el,i){
//console.log(el,i)
        el.Features = newVal.nodes[i].Features

        if (newVal.nodes[i].Agent.x !== undefined) {
                el.fixed = true
                el.x = newVal.nodes[i].Agent.x * scale + 40;
                el.y = newVal.nodes[i].Agent.y * scale + 40;
                el.px = el.x
                el.py = el.y
                //console.log(el.x,el.y)
        }
        
})
start()

//force.tick()


}

// update the graph object

/*
var link = svg.selectAll(".link")

link.data(graph.links).enter().insert("line", ".node")
      .attr("class", "link");   */
 /*     
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
*/
//  node.append("title")
  //    .text(function(d) { return d.x + "-" +d.y; });
      
      /*
       node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return "jajajaja" });
*/

  

});


  
      }
    }
  });

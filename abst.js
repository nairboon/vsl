#! /usr/bin/env node

var parser = require("nomnom"),
 model = require("./model.js");

parser.command('start')
   .option('model', {
      abbr: 'm',
      required: true,
      help: "binary of the model"
   })
   .callback(function(opts) {
      model.load(opts.model,function(err,parameters){
      	console.log(parameters)
      	//start the webapp
      	 app = require("./app.js");
      })
   })
   .help("start the ui")

parser.parse();

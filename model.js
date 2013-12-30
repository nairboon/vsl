var fs = require("fs"),
spawn = require('child_process').spawn;
var StreamSplitter = require("stream-splitter");
var StringScanner = require("StringScanner");


var Model = {};

/*
fs.readdir(models,function(err,files){
console.log(files);

})
*/

Model.load = function(file,cb) {

/* read flags*/
var proc = spawn(file,["--help"]);
proc.on("error",function(err){
console.log("model is not executable?")
cb(err,null)
})
var splitter = proc.stderr.pipe(StreamSplitter("\n"));

splitter.encoding = "utf8";

Model.ParamDesc = [];
Model.AbstRuntimeParams = [];

splitter.on("token", function(token) {
 if(token.indexOf("Usage of") > -1) {
 return 
}
var ss = new StringScanner(token);
ss.check(/\s*-(.*)=(.*):\s(.*)/)
var p = ss.captures()
if(p.length == 3){
 tmp = {name: p[0], default: p[1], desc: p[2]}
  if(token.indexOf("abst.") > -1) {
  Model.AbstRuntimeParams.push(tmp)
 } else {

   Model.ParamDesc.push(tmp)
 }
// console.log(tmp)
}

});
splitter.on("done", function() {
    cb(null,Model.ParamDesc)
});
}

Model.run = function(ParamDesc,done,journalupdate) {
console.log(ParamDesc)
}

module.exports = Model;


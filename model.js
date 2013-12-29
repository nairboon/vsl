var fs = require("fs"),
spawn = require('child_process').spawn;
var StreamSplitter = require("stream-splitter");
var StringScanner = require("StringScanner");

var models = "abmmodels";
/*
fs.readdir(models,function(err,files){
console.log(files);

})
*/

exports.load = function(file,cb) {

/* read flags*/
var proc = spawn(file,["--help"]);
proc.on("error",function(err){
console.log("model is not executable?")
cb(err,null)
})
var splitter = proc.stderr.pipe(StreamSplitter("\n"));

splitter.encoding = "utf8";

splitter.on("token", function(token) {
 if(token.indexOf("Usage of") > -1) {
 return 
}
var ss = new StringScanner(token);
ss.check(/\s*-(.*)=(.*):\s(.*)/)
var p = ss.captures()
cb(null,p)
console.log(p)
});
}


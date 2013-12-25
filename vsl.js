var fs = require("fs"),
spawn = require('child_process').spawn;
var StreamSplitter = require("stream-splitter");
var StringScanner = require("StringScanner");

var models = "abmmodels";

fs.readdir(models,function(err,files){
console.log(files);
/* read flags*/
var proc = spawn("abmmodels/"+files[0],["--help"]);
var splitter = proc.stderr.pipe(StreamSplitter("\n"));

splitter.encoding = "utf8";

splitter.on("token", function(token) {
 if(token.indexOf("Usage of") > -1) {
 return 
}
var ss = new StringScanner(token);
ss.check(/\s*-(.*)=(.*):\s(.*)/)
var p = ss.captures()

console.log(p)
});



})



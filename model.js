var fs = require("fs"),

    readline = require('readline'),
spawn = require('child_process').spawn;
var StreamSplitter = require("stream-splitter");
var StringScanner = require("StringScanner");


var Model = {exe:""};

/*
fs.readdir(models,function(err,files){
console.log(files);

})
*/

Model.load = function(file,cb) {
Model.exe = file
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

Model.run = function(params,done,journalupdate) {
//console.log(params)

var runid = require('crypto').randomBytes(3).toString('hex');
// generate params
var ParamDesc = []
params.model.forEach(function(item){
        ParamDesc.push("-"+item.name+"="+item.default)
})
//add abst params
ParamDesc.push("-abst.journal=true")
ParamDesc.push("-abst.logtofile=true")
ParamDesc.push("-abst.out=.abst_output")
ParamDesc.push("-abst.runid="+runid)

console.log(ParamDesc)

//run model
var proc = spawn(Model.exe,ParamDesc);

//start the journal streaming
var outpath =".abst_output/goabm."+runid

var journal = outpath +"/journal"

/*if(!fs.existsSync(outpath)) {
        fs.mkdirSync(outpath)
}*/


var gw = fs.watch(".abst_output", function (event, filename) {

  if (filename == "goabm."+runid) {
   // console.log('filename provided: ' + filename);
    var jw = fs.watch(outpath, { persistent: false},function (event, filename) {
        if(filename == "journal") {
        // dirty hack to wat for the journal to be created
        // would be usefule to have someting like. child_proces.on("ready")
        //console.log("journal ready")
        jw.close()
        gw.close()
        
        
        var instream = fs.createReadStream(journal);
console.log("reading journal..")

var rl = readline.createInterface({
    input: instream,
    terminal: false
});

rl.on('line', function(line) {

var content = JSON.parse(line)
 Model.socketio.emit('model:journal', content);
    //console.log(content);
    
});

        }
    })
  }
});


proc.stdout.on("data",function(data){
console.log(data.toString())
})


proc.on("error",function(err){
console.log("model is not executable?")
done(err,null)
})

proc.stderr.on('data', function (data) {
  console.log('stderr: ' + data);
});

proc.on("close",function(code){
console.log("model exited with"+code)
done(null,null)
})

}

Model.stream = function (socket) {
 Model.socketio = socket
 console.log("SOCKET READY")
}

module.exports = Model;



exports.index = function(req, res){
console.log("Get model request")
var mymodel = {a: "jasdjasd"}
  res.send(mymodel);
};



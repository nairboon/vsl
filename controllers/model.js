var model = require('../model.js');

exports.index = function(req, res){
console.log("Get model request",model.ParamDesc)

  res.send(model.ParamDesc);
};

exports.create = function(req, res){ // POST /model
params = req.body

//console.log("run the model with",params)

model.run(params)
  res.send("ok");
};


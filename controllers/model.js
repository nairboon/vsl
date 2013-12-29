var model = require('../model.js');

exports.index = function(req, res){
console.log("Get model request",model.ParamDesc)

  res.send(model.ParamDesc);
};



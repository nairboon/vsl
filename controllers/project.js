var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db.ne', autoload: true });

exports.index = function(req, res){
db.find({ type: 'project' }, function (err, docs) {
    res.send(docs);
    //console.log(docs);
});
};

exports.create = function(req, res){
console.log("crate project")
var doc = { type: 'project',
	name: req.body.name
}
db.insert(doc, function (err, newDoc) {   // Callback is optional


});

  res.send('create forum');
};

exports.show = function(req, res){
  console.log("show",req.params)
  db.find({ _id: req.params.project }, function (err, docs) {
    res.send(docs[0]);
   // console.log(docs);
});

};

exports.edit = function(req, res){
  res.send('edit forum ' + req);
};

exports.update = function(req, res){

db.update({ _id: req.params.project }, { $set: { name: req.body.name } }, function (err, numReplaced) {
  console.log("update",req.params)
  res.send('update forum ' + req);
});



};

exports.destroy = function(req, res){
db.remove({ _id: req.params.project } , function (err, numReplaced) {
  //console.log("update",req)
    res.send('destroy project ' + req.params.project);
});


};

exports.load = function(id, fn){
  process.nextTick(function(){
    fn(null, { title: 'Ferrets' });
  });
};

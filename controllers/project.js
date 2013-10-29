var Datastore = require('nedb')
  , db = new Datastore({ filename: 'db.ne', autoload: true });

exports.index = function(req, res){
db.find({ type: 'project' }, function (err, docs) {
    res.send(docs);
});
};

exports.create = function(req, res){
console.log("crate project")
var doc = { type: 'project',
	name: "Unnamed Project"
}
db.insert(doc, function (err, newDoc) {   // Callback is optional


});

  res.send('create forum');
};

exports.show = function(req, res){
  res.send('show forum ' + req.forum.title);
};

exports.edit = function(req, res){
  res.send('edit forum ' + req);
};

exports.update = function(req, res){

db.update({ _id: req.params.project }, { $set: { name: req.body.name } }, function (err, numReplaced) {
  console.log("update",req)
  res.send('update forum ' + req);
});



};

exports.destroy = function(req, res){
  res.send('destroy forum ' + req.forum.title);
};

exports.load = function(id, fn){
  process.nextTick(function(){
    fn(null, { title: 'Ferrets' });
  });
};

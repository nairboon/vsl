
/**
 * Module dependencies
 */

var express = require('express'),
  routes = require('./routes'),
 resource = require('express-resource'),
  //api = require('./routes/api.js'),
  http = require('http'),
  path = require('path');

var app = express();



/**
 * Configuration
 */



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

app.configure('development', function(){
  app.use(express.errorHandler());
  app.locals.pretty = true;
});

// development only
if (app.get('env') === 'development') {
  //app.use(express.errorHandler());
}

// production only
if (app.get('env') === 'production') {
  // TODO
};



/**
 * Routes
 */



// serve index and view partials
app.get('/', routes.index);
app.get('/partials/:name', routes.partials);

// JSON API
//app.get('/api/name', api.name);



var projects = app.resource('api/projects', require('./controllers/project'));
var model = app.resource('api/model', require('./controllers/model'));
//model.map('run', '/user', favs.buses);
//projects.add(experiments);


// redirect all others to the index (HTML5 history)
app.get('*', routes.index);

var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
// Socket.io Communication
io.sockets.on('connection', require('./model.js').stream);

/**
 * Start Server
 */

server.listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});

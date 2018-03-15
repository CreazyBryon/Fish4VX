
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , vx = require('./routes/vx')  
  , scraper = require('./services/scrape').getScraper()   
  , http = require('http')
  , xmlparser = require('express-xml-bodyparser')
  , path = require('path');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

vx.init(scraper);

app.get('/', routes.index);
app.get('/users', user.list);
app.get('/vx', vx.index);
app.post('/vx',xmlparser({trim: false, explicitArray: false}), vx.msg);
app.get('/vx/debug', vx.debug);


//run
scraper.start();

app.get('/pages',function(req, res){
	res.send(scraper.pages);
});

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

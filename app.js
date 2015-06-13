var express = require('express');
var ejs = require('ejs');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var partials = require('./routes/partials');

var app = express();

// view engine setup
app.engine('html', ejs.renderFile);
app.set('views', path.join(__dirname, 'app'));
app.set('view engine', 'html');

//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(__dirname + '/app'));

// serve index and view partials
app.use('/', routes);
app.use('/partials/:partialPath', partials);
// redirect all others to the index (HTML5 history)
app.use('*', routes);


module.exports = app;

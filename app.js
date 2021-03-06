var express = require('express');
var path = require('path');
var config = require("nconf");
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var config = require('./config');
var passport = require('passport');
var flash = require('connect-flash');
var session = require('express-session');

var index = require('./routes/index');
var registration = require('./routes/registration');
var login = require('./routes/login');
var user = require('./routes/user');
var project = require('./routes/project');
var projects = require('./routes/projects');
var admin = require('./routes/admin');

var app = express();


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.engine('html', require('pug').renderFile);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client/src')));
app.use(express.static(path.join(__dirname, 'client')));
app.use(express.static(path.join(__dirname, 'client/src/app')));

app.use(cors());

var passport = require('./services/passport');


app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }, resave: true, saveUninitialized: true }))
app.use(passport.initialize());
app.use(passport.session());


app.use('/', index);
app.use('/', registration);
app.use('/', login);
app.use('/', user);
app.use('/', project);
app.use('/', projects);
app.use('/', admin);

require("./services/mongoose");

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

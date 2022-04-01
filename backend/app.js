var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
// var cors = require('cors')//cors跨域
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var positionsRouter = require('./routes/positions')

var cookieSession = require('cookie-session')

var app = express();

//cors
// app.use(cors())

//cookie-session
app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//添加头部设置
app.use((req, res, next)=>{
  res.set('content-type', 'application/json;charset=utf-8')
  next()
})

app.use('/test', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/positions', positionsRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

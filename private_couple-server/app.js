var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// 인스턴스
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var itemRouter = require('./routes/addItem');

var app = express();

const mongoose = require('mongoose');
mongoose.connect(
  'mongodb+srv://Private_Chuul:2030@cluster0.tv2ci.mongodb.net/private_couple?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true},
  function(error) {
    if(error) {
      console.error('mongodb connection error!!!', err);
    }
    console.log('mongodb connected!!!');
  });

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/create/add', itemRouter);

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

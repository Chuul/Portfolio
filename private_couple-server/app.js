const express = require('express');
const path = require('path');
const morgan = require('morgan');

const connect = require('./schemas/connect');
const indexRouter = require('./routes/index')
const addItemRouter = require('./routes/addItem');

const app = express();

app.set('port', process.env.PORT || 8800);

connect();
app.use(express.static(path.join(__dirname, 'public')));

app.use(morgan('dev'));
app.use('/', indexRouter);
app.use('/creating', addItemRouter);

// app.get('/', (req, res) => {
//   res.send('hello')
// })

app.use((req, res, next) => {
  const error =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => {
  console.log('8800번 포트에서 서버 실행 중')
})
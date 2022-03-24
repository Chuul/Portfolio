const express = require('express');
const history = require('connect-history-api-fallback');
const path = require('path');
const morgan = require('morgan');

const connect = require('./schemas/connect');
const indexRouter = require('./routes/index')
const loginRouter = require('./routes/login');
const creatingRouter = require('./routes/creating');
const listRouter = require('./routes/list');
const startRouter = require('./routes/start');
const lastRouter = require('./routes/last');

const app = express();

app.set('port', process.env.PORT || 8800);
app.set('view engine', 'html');
app.use(history());
connect();
app.use(express.static(path.join(__dirname, '../private_couple/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if(process.env.NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/creating', creatingRouter);
app.use('/list', listRouter);
app.use('/start', startRouter);
app.use('/last', lastRouter);

app.use((req, res, next) => {
  const err =  new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.locals.message = '알 수 없는 오류 (오류문의 "bethejs30@gmail.com")';
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(app.get('port'), () => { 
  console.log('8800번 포트에서 서버 실행 중')
})
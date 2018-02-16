var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
// cookie解析包
var cookieParser = require('cookie-parser');
// 请求体解析包
var bodyParser = require('body-parser');
// 设置跨域
let corsConfig = require('./corsConfig')
// 创建数据库连接池
let connect = require('./src/main/resources/dbconnect');
connect.init();

// 基本文件路径和测试路径
let mainPath = './src/main';
let testPath = './src/test';

// 正式路由
var indexRouter = require(`${mainPath}/app/routes/index`);
let areaRouter = require(`${mainPath}/app/routes/area`);
// 测试路由
let areaTestRouter = require(`${testPath}/app/routes/areaRouterTest.test`);
var app = express();

// 允许跨域
app.all('*',corsConfig);
// view engine setup
// jade设置路径
app.set('views', path.join(__dirname, `${mainPath}/webapp/views`));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
// 测试路由
app.use('/test', areaTestRouter);

// 正式路由
app.use('/area', areaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  console.log('err:' + err.status);
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

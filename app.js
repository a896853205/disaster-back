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
let mainPath = './src/main'
let testPath = './src/test'

// 中间件
let verifyIdMiddle = require(`${mainPath}/app/middle/checkId`);

// 正式路由
// 无权限路由
let noneRouter = require(`${mainPath}/app/routes/none`)
// 所有权限路由
let getTokenRouter = require(`${mainPath}/app/routes/getToken`);
let getNavRouter = require(`${mainPath}/app/routes/nav`)

let areaRouter = require(`${mainPath}/app/routes/area`)
let goodsRouter = require(`${mainPath}/app/routes/goods`)
let rescueRouter = require(`${mainPath}/app/routes/rescue`)
let strengthRouter = require(`${mainPath}/app/routes/strength`)
let computedRouter = require(`${mainPath}/app/routes/computed`)
// 测试路由
let areaTestRouter = require(`${testPath}/app/routes/areaRouterTest.test`)
let goodTestRouter = require(`${testPath}/app/routes/goodRouterTest.test`)
let rescueTestRouter = require(`${testPath}/app/routes/rescueRouterTest.test`)
let distanceTestRouter = require(`${testPath}/app/routes/distanceRouterTest.test`)

var app = express()

// 允许跨域
app.all('*',corsConfig)
// view engine setup

// jade设置路径
app.set('views', path.join(__dirname, `${mainPath}/webapp/views`));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// 测试路由
app.use('/test', areaTestRouter, goodTestRouter, rescueTestRouter, distanceTestRouter)

// 判断登录权限的中间件
app.use('/home', verifyIdMiddle);

// 没有权限的的路由
app.use('/', noneRouter);
// 正式路由
app.use('/home', areaRouter, goodsRouter, rescueRouter)
app.use('/strength', strengthRouter)
app.use('/computed', computedRouter)

// 获取token的值,根据自己的权限获取nav的值
app.use('/home/all', getTokenRouter, getNavRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  console.log('err:' + err.status)
  err.status = 404;
  next(err)
})

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

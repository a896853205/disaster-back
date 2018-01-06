/*
 * @Author: qc 
 * @Date: 2017-12-26 20:36:44 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-06 20:41:34
 */
let connectionConfig = require('./dbconfig');
let mysql = require('mysql');
let db = {};
// 连接池对象
let pool;
/**
 * 连接池初始化
 */
db.init = ()=>{
  pool = mysql.createPool(connectionConfig);
}
/**
 * 使用链接池的链接
 * @param {*操作数据库语句} sqllan 
 * @param {*sql参数} params
 * @param {*成功时的回调函数} fn 
 */

db.query = (sqllan, params, fn) => {
  pool.getConnection((err, connection)=>{
    connection.query(sqllan, params, (err, rows, fields) => {
      if (err) {
        console.log(err);
        return;
      }
      if (fn) {
        fn(rows);
        connection.release();
      }
    });
  });
}

module.exports = db;
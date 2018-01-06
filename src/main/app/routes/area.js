/*
 * @Author: qc
 * @Date: 2018-01-07 00:08:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-07 00:15:49
 */
let result = require('../common/returnObject');
let areaOperate = require('../dao/areaDao');
let express = require('express');
let router = express.Router();

/**
 * 查询所有地区基本信息的路由
 */
router.get('/selectAll',(req, res, next) => {
  areaOperate.selectAllArea().then((value)=>{
    // 成功时状态为1
    result.status = 1;
    result.data = value;
    res.json(result);
  }).catch((e) => {
    console.log(e);
    result.errMessage = '查询所有地区基本信息失败'
    res.json(result);
  });
});

module.exports = router;
/*
 * @Author: qc
 * @Date: 2018-01-07 00:08:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-15 19:17:22
 */
let returnObject = require('../common/returnObject');
let areaOperate = require('../dao/areaDao');
let express = require('express');
let router = express.Router();

/**
 * 查询所有地区基本信息的路由
 */
router.get('/getAllArea',(req, res, next) => {
  let result = new returnObject()
  areaOperate.selectAllArea()
  .then(value => {
    result.linkSuccess()
    let allArea = value;
    res.json({
      statusObj: result,
      allArea
    })
  })
  .catch(e => {
    result.errMessage = '查询所有地区基本信息失败'
    res.json(result);
  });
});

module.exports = router;
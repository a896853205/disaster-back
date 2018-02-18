/*
 * @Author: qc
 * @Date: 2018-01-07 00:08:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-16 12:18:36
 */
let returnObject = require('../common/returnObject');
let areaService = require('../service/areaService');
let express = require('express');
let router = express.Router();

/**
 * 查询所有地区基本信息的路由
 */
router.get('/getAllArea',(req, res, next) => {
  let result = new returnObject()
  areaService.selectAllArea()
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      allArea: value
    })
  })
  .catch(e => {
    result.errMessage = '查询所有地区基本信息失败'
    res.json(result)
  });
});

module.exports = router
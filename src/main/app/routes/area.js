/*
 * @Author: qc
 * @Date: 2018-01-07 00:08:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-21 17:01:46
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
/**
 * 增加地区基本信息
 */
router.post('/addArea', (req, res, next) => {
  let result = new returnObject()
  // 获取前台的数据
  let param = req.body
  areaService.addArea(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '增加地区基本信息失败'
    res.json(result)
  });
})
module.exports = router
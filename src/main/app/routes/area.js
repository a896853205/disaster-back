/*
 * @Author: qc
 * @Date: 2018-01-07 00:08:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-22 11:44:10
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
/**
 * 修改地区基本信息
 */
router.post('/updateArea', (req, res, next) => {
  let result = new returnObject()
  // 获取前台的数据
  let param = req.body
  areaService.updateArea(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '修改地区基本信息失败'
    res.json(result)
  });
})
/**
 * 删除地区
 */
router.post('/deleteArea', (req, res, next) => {
  let result = new returnObject()
  // 获取前台的数据
  let param = req.body
  areaService.deleteArea(param.id)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '删除地区基本信息失败'
    res.json(result)
  });
})
module.exports = router
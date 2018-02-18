/*
 * @Author: qc 
 * @Date: 2018-01-06 12:09:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 11:15:28
 */

let areaOperate = require('../../app/dao/areaDao.test');
let returnFunction = require('../../../main/app/common/returnObject');
let express = require('express');
let router = express.Router();
/**
 * 增加地区基本信息
 */
router.post('/area/insert',(req, res, next) => {
  let result = new returnFunction()
  let area = req.body
  areaOperate.insertArea(area)
  .then(() => {
    // 成功时返回1
    result.linkSuccess()
    res.json(result)
  })
  .catch(err => {
    // 未成功时直接返回
    result.errMessage = '灾区基本情况插入未成功'
    res.json(result)
  })
})
/**
 * 清除地区基本信息表
 */
router.get('/area/truncate',(req, res, next) => {
  let result = new returnFunction()
  areaOperate.truncate()
  .then(() => {
    result.linkSuccess()
    res.json(result)
  })
  .catch(err => {
    // 未成功时直接返回
    result.errMessage = '灾区基本情况表清理未成功'
    res.json(result)
  })
})

module.exports = router

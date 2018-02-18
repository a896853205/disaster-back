/*
 * @Author: qc 
 * @Date: 2018-01-06 12:09:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 14:18:01
 */


let returnFunction = require('../../../main/app/common/returnObject')

let goodOperate = require('../../app/dao/goodDao.test')
let needOperate = require('../../app/dao/needDao.test')

let needService = require('../service/needService')
let express = require('express');
let router = express.Router()
/**
 * 增加货物基本
 */
router.post('/good/insert',(req, res, next) => {
  let result = new returnFunction()
  let good = req.body
  goodOperate.insertGood(good)
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
 * 增加地区需求系数表
 */
router.post('/need/needInsert', (req, res, next) => {
  let result = new returnFunction()
  needService.addNeedByAreaAndGood()
  .then(() => {
    result.linkSuccess()
    res.json(result)
  })
  .catch(err => {
    // 未成功时直接返回
    result.errMessage = '增加地区需求系数表插入未成功'
    res.json(result)
  })
})
/**
 * 清除货物基本表
 */
// router.get('/area/truncate',(req, res, next) => {
//   let result = new returnFunction()
// })

/**
 * 清除需求表
 */
router.post('/need/truncate', (req, res, next) => {
  let result = new returnFunction()
  needOperate.truncate()
  .then(() => {
    result.linkSuccess()
    res.json(result)
  })
  .catch(err => {
    // 未成功时直接返回
    result.errMessage = '地区需求系数表清除未成功'
    res.json(result)
  })
})

module.exports = router

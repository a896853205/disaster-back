/*
 * @Author: qc 
 * @Date: 2018-01-06 12:09:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-19 16:53:24
 */

let rescueService = require('../service/rescueService')

let returnFunction = require('../../../main/app/common/returnObject')
let express = require('express')
let router = express.Router()
/**
 * 增加一个物资基本信息
 */
router.post('/rescue/insert',(req, res, next) => {
  let result = new returnFunction()
  let rescue = req.body
  rescueService.insertRescue(rescue.name, rescue.longitude, rescue.latitude, rescue.switch)
  .then(() => {
    // 成功时返回1
    result.linkSuccess()
    res.json(result)
  })
  .catch(err => {
    // 未成功时直接返回
    result.errMessage = '物资基本信息插入未成功'
    res.json(result)
  })
})
/**
 * 增加一个物资货物基本信息
 */
router.post('/rescue/goodInsert', (req, res, next) => {
  let result = new returnFunction()
  let rescueGood = req.body
  rescueService.insertRescueGood()
  .then(() => {
    // 成功时返回1
    result.linkSuccess()
    res.json(result)
  })
  .catch(err => {
    // 未成功时直接返回
    result.errMessage = '物资基本物资信息插入未成功'
    res.json(result)
  })
})

module.exports = router

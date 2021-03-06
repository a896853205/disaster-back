/*
 * @Author: qc 
 * @Date: 2018-01-06 12:09:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-21 18:12:56
 */

let distanceService = require('../service/distanceService')
let returnFunction = require('../../../main/app/common/returnObject')
let express = require('express')
let router = express.Router()
/**
 * 增加路况
 */
router.post('/distance/insert',(req, res, next) => {
  let result = new returnFunction()
  distanceService.insertDistance()
  .then(() => {
    // 成功时返回1
    result.linkSuccess()
    res.json(result)
  })
  .catch(err => {
    // 未成功时直接返回
    result.errMessage = '路况插入未成功'
    res.json(result)
  })
})
router.post('/distance/insertAreaAreaDistance', (req, res, next) => {
  let result = new returnFunction()
  distanceService.insertAreaAreaDistance()
  .then(() => {
    // 成功时返回1
    result.linkSuccess()
    res.json(result)
  })
  .catch(err => {
    // 未成功时直接返回
    result.errMessage = '路况插入未成功'
    res.json(result)
  })
})


module.exports = router

/*
 * @Author: qc
 * @Date: 2018-01-07 00:08:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 17:48:23
 */
let returnObject = require('../common/returnObject')
let areaService = require('../service/areaService')
let densityService = require('../service/densityService')
let typeService = require('../service/typeService')
let goodService = require('../service/goodService')
let earthquakeService = require('../service/earthquakeService')
let needResultService = require('../service/needResultService')

let uuid = require('uuid')
let express = require('express')
let router = express.Router()

/**
 * 计算出需求信息
 */
router.post('/computedNeed', (req, res, next) => {
  console.log('开始计算')
  let result = new returnObject()
  // 查询所有人口密度修正系数,然后进入回调函数
  Promise.all([densityService.selectAllDensity(), typeService.selectAllTypeFactor(), goodService.selectAllGood()])
  .then(value => {
    console.log('查询结束')
    let allDensityFactor = value[0]
    let allTypeFactor = value[1]
    let allGood = value[2]
    let Djk = []
    // 从req中获取地震的数组
    let param = req.body
    needResultService.computedNeedResult(param)
    .then(Djk => {
      // 然后返回给前台
      res.json({
        statusObj: result,
        needResult: Djk
      })
    })
  })
  .catch(e => {
    console.log(e)
  })
})


module.exports = router
/*
 * @Author: qc
 * @Date: 2018-01-07 00:08:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-03-13 14:27:25
 */
let returnObject = require('../common/returnObject')
let areaService = require('../service/areaService')
let densityService = require('../service/densityService')
let typeService = require('../service/typeService')
let goodService = require('../service/goodService')
let earthquakeService = require('../service/earthquakeService')
let needResultService = require('../service/needResultService')
let areaNeedResultService = require('../service/areaNeedResultService')
let areaUpLoadService = require('../service/areaUpLoadService')

let uuid = require('uuid')
let express = require('express')
let router = express.Router()

/**
 * 计算出需求信息
 */
router.post('/computedNeed', (req, res, next) => {
  let result = new returnObject()
  // 查询所有人口密度修正系数,然后进入回调函数
  Promise.all([densityService.selectAllDensity(), typeService.selectAllTypeFactor(), goodService.selectAllGood()])
  .then(value => {
    let allDensityFactor = value[0]
    let allTypeFactor = value[1]
    let allGood = value[2]
    let Djk = []
    // 从req中获取地震的数组
    let param = req.body
    needResultService.computedNeedResult(param)
    .then(Djk => {
      result.linkSuccess()
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

router.post('/computedAreaNeed', (req, res, next) => {
  let result = new returnObject()
  // 从req中获取问卷标题
  let param = req.body
  areaNeedResultService.getAreaNeed(param)
  .then(({areaNeedResult, unPut}) => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      areaNeedResult,
      unPut
    })
  })
  .catch(e => {
    console.log(e)
  })
})

router.post('/computedUpLoad', (req, res, next) => {
  let result = new returnObject()
  // 从req中获取问卷标题
  let param = req.body
  areaUpLoadService.areaUpLoad(param)
  .then(upLoadArr => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      upLoadArr: upLoadArr
    })
  })
  .catch(e => {
    console.log(e)
  })
})
module.exports = router
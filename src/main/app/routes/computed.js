/*
 * @Author: qc
 * @Date: 2018-01-07 00:08:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-16 14:48:48
 */
let returnObject = require('../common/returnObject')
let areaService = require('../service/areaService')
let densityService = require('../service/densityService')
let express = require('express')
let router = express.Router()

/**
 * 计算出需求信息
 */
router.post('/computedNeed', (req, res, next) => {
  let result = new returnObject()
  // 查询所有人口密度修正系数,然后进入回调函数->
  densityService.selectAllDensity()
  .then(allDensityFactor => {
    
    // 从req中获取地震的数组
    let param = req.body
    param.forEach(areaItem => {
      let RD = dieRate(areaItem.collapseValue)
      console.log('人员死亡率:' + RD)
      let fp = densityFactorNum(areaItem.density, allDensityFactor)
      console.log('人口密度的修正系数:' + fp)
      let ND = dieNum(fp, areaItem.lieValue, RD, areaItem.population)
      console.log('人员死亡估计值:' + ND)
      let SS = injuredNum(ND)
      console.log('人员受伤估计值:' + SS)
    })
  })
})

/**
 * 计算死亡率
 * @param {Number} RB 房屋倒塌率
 */
function dieRate (RB) {
  return Math.pow(10, RB * 0.9 - 10.07)
}
/**
 * @param {Number} density 人口密度
 */
function densityFactorNum (density, allDensityFactor) {
  let resultFactor = 0
  allDensityFactor.forEach(densityFactor => {
    if (densityFactor.end === null) {
      // 只有下限的情况
      if (density >= densityFactor.begin) {
        resultFactor = densityFactor.coeffcient
      }
    } else {
      // 又有上限又有下限
      if (density >= densityFactor.begin && density < densityFactor.end) {
        resultFactor = densityFactor.coeffcient
      }
    }
  })
  return resultFactor
}
/**
 * 计算人员死亡估计值
 * @param {Number} fp 人口密度系数
 * @param {Number} ft 烈度系数
 * @param {Number} RD 人员死亡率
 * @param {Number} M 该地区人口总数
 */
function dieNum (fp, ft, RD, M) {
  return fp * ft * RD * M
}
/**
 * @param {Number} ND 人员死亡估计值
 */
function injuredNum (ND) {
  return ND * 4
}
module.exports = router
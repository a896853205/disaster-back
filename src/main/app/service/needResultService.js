let needResultOperate = require('../dao/needResultDao')

let areaService = require('../service/areaService')
let densityService = require('../service/densityService')
let typeService = require('../service/typeService')
let goodService = require('../service/goodService')

let earthquakeMapper = require('../../resources/mapper/earthquakeMapper')
let needResultMapper = require('../../resources/mapper/needResultMapper')
let SqlParams = require('../../resources/SqlParams')
let db = require('../../resources/dbconnect')

let uuid = require('uuid')

let needResultService = {}

/**
 * 插入需求信息
 */
needResultService.insertNeedResult = (earthquake_id, area_id, good_id, amount) => {
  return new Promise((resolve, reject) => {
    needResultOperate.insertNeedResult(earthquake_id, area_id, good_id, amount)
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

needResultService.computedNeedResult = (param) => {
  return new Promise((resolve, reject) => {
    // 查询所有人口密度修正系数,然后进入回调函数
    Promise.all([densityService.selectAllDensity(), typeService.selectAllTypeFactor(), goodService.selectAllGood()])
    .then(value => {
      console.log('查询结束')
      let allDensityFactor = value[0]
      let allTypeFactor = value[1]
      let allGood = value[2]
      let Djk = []
      let sqlparam = new SqlParams()
      let earthquakeId = uuid()
      param.forEach(areaItem => {
        // 插入地震信息表
        sqlparam.setSql(earthquakeMapper.insertEarthquake, [earthquakeId, areaItem.id, areaItem.collapseValue, areaItem.lieValue])
        // earthquakeService.insertEarthquake(earthquakeId, areaItem.id, areaItem.collapseValue, areaItem.lieValue)
        let RD = dieRate(areaItem.collapseValue)
        console.log('人员死亡率:' + RD)
        let fp = densityFactorNum(areaItem.density, allDensityFactor)
        console.log('人口密度的修正系数:' + fp)
        let ND = dieNum(fp, areaItem.lieValue, RD, areaItem.population)
        console.log('人员死亡估计值:' + ND)
        let SS = injuredNum(ND)
        console.log('人员受伤估计值:' + SS)
        allGood.forEach(goodItem => {
          allTypeFactor.forEach(typeItem => {
            let item = needGood(areaItem, goodItem, typeItem, SS, ND)
            if (item) {
              Djk.push(item)
            }
          })
        })
      })
      // 插入到需求信息表中
      Djk.forEach(needItem => {
        sqlparam.setSql(needResultMapper.insertNeedResult, [uuid(), earthquakeId, needItem.area_id, needItem.good_id, needItem.needNum])
      })
      db.transactions(sqlparam.sqlArr, resolve, Djk)
    })
  })
}

/**
 * 形成需求对象
 * @param {Object} areaItem 地区对象
 * @param {Object} goodItem 物资对象
 * @param {Object} typeItem 类型对象
 * @param {Number} SS 当前地区受伤人数
 * @param {Number} ZS 当前地区总人数
 */
function needGood(areaItem, goodItem, typeItem, SS, ZS) {
  if (goodItem.type_id === typeItem.type_id) {
    return {
      area_id: areaItem.id,
      area_name: areaItem.name,
      good_id: goodItem.id,
      good_name: goodItem.name,
      needNum: needNum(areaItem, goodItem, typeItem, SS, ZS)
    }
  }
}
/**
 * 计算需求数
 * @param {Object} areaItem 地区对象
 * @param {Object} goodItem 物资对象
 * @param {Object} typeItem 类型对象
 * @param {Number} SS 当前地区受伤人数
 * @param {Number} ZS 当前地区总人数
 */
function needNum (areaItem, goodItem, typeItem, SS, ZS) {
  if (typeItem.type_id === '1') {
    return Math.ceil(typeItem.coeffcient * SS)
  } else if (typeItem.type_id === '2') {
    return Math.ceil(typeItem.coeffcient * SS)
  } else if (typeItem.type_id === '3') {
    return Math.ceil(typeItem.coeffcient * (areaItem.population - ZS))
  } else if (typeItem.type_id === '4') {
    return Math.ceil(typeItem.coeffcient * (areaItem.population - ZS))
  }
}
/**
 * 计算死亡率
 * @param {Number} RB 房屋倒塌率
 */
function dieRate (RB) {
  return Math.pow(10, Math.pow(0.1, RB) / 9 - 10.07)
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
  return Math.ceil(fp * ft * RD * M)
}
/**
 * @param {Number} ND 人员死亡估计值
 */
function injuredNum (ND) {
  return Math.ceil(ND * 4)
}

module.exports = needResultService

// 直观一些,行政区划
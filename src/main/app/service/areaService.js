let areaOperate = require('../dao/areaDao')
let rescueOperate = require('../dao/rescueDao')
let distanceOperate = require('../dao/distanceDao')
let random = require('../common/random')
let uuid = require('uuid')
let areaService = {}

/**
 * 获取所有地点
 */
areaService.selectAllArea = () => {
  return new Promise((resolve, reject) => {
    areaOperate.selectAllArea()
    .then(value => {
      resolve(value)
    })
  })
}
/**
 * 增加一个地区基本信息
 */
areaService.addArea = ({name, population, density, longitude, latitude}) => {
  // 增加这个地区与所有地区的距离(暂时随机)
  // 和所有资源点的距离
  return new Promise((resolve, reject) => {
    Promise.all([
      areaOperate.selectAllArea(),
      rescueOperate.selectAllRescue()])
    .then(value => {
      let addDistanceArray = []
      let allArea = value[0]
      let allRescue = value[1]
      let areaId = uuid()
      // 这里把该增加的都push到一个数组里,然后Promise.all
      // 加入所有灾点与灾点的距离(正反)
      allArea.forEach(areaItem => {
        let distance = random(200, 5000)
        addDistanceArray.push(distanceOperate.insertAreaAreaDistance(areaItem.id, areaId, distance))
        addDistanceArray.push(distanceOperate.insertAreaAreaDistance(areaId, areaItem.id, distance))
      })
      // 加入灾点与物资点的距离
      allRescue.forEach(rescueItem => {
        let distance = random(200, 5000)
        addDistanceArray.push(distanceOperate.insertAreaRescueDistance(rescueItem.id, areaId, distance))
      })
      // 增加地区信息
      addDistanceArray.push(areaOperate.addArea({areaId, name, population, density, longitude, latitude}))
      return Promise.all(addDistanceArray)
    })
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 修改地区基本信息
 */
areaService.updateArea = ({id, name, population, density, longitude, latitude}) => {
  return new Promise((resolve, reject) => {
    areaOperate.updateArea({id, name, population, density, longitude, latitude})
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 删除地区基本信息
 */
areaService.deleteArea = id => {
  // 删除这个地区的所有距离
  return new Promise((resolve, reject) => {
    Promise.all([
      distanceOperate.deleteAreaBeginDistance(id),
      distanceOperate.deleteAreaEndDistance(id),
      distanceOperate.deleteAreaRescueDistanceByAreaId(id),
      areaOperate.deleteArea(id)
    ])
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
module.exports = areaService
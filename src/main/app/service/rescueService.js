let rescueOperate = require('../dao/rescueDao')
let distanceOperate = require('../dao/distanceDao')
let areaOperate = require('../dao/areaDao')
let goodOperate = require('../dao/goodDao')
let vehicleOperate = require('../dao/vehicleDao')

let random = require('../common/random')
let uuid = require('uuid')
let rescueService = {}

/**
 * 获取所有营救点
 */
rescueService.selectAllRescue = () => {
  return new Promise((resolve, reject) => {
    rescueOperate.selectAllRescue()
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

/**
 * 增加营救点 
 */
rescueService.addRescue = ({name, longitude, latitude, open}) => {
  // 增加营救点与灾点的距离
  return new Promise((resolve, reject) => {
    areaOperate.selectAllArea()
    .then(value => {
      let allArea = value
      let addDistanceArray = []
      // 营救点的id
      let rescueUuid = uuid()
      allArea.forEach(areaItem => {
        let distance = random(200, 5000)
        // 插入营救点与灾点的距离
        addDistanceArray.push(distanceOperate.insertAreaRescueDistance(rescueUuid, areaItem.id, distance))
      })
      // 插入营救点基本信息
      addDistanceArray.push(rescueOperate.addRescue({rescueUuid, name, longitude, latitude, open}))
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
 * 删除营救点
 */
rescueService.deleteRescue = id => {
  // 删除所有该营救点的所有距离
  // 删除所有营救点的车辆---------------
  // 删除所有营救点的所有物资
  return new Promise((resolve, reject) => {
    let deleteDistanceArray = []
    Promise.all([
      rescueOperate.deleteRescue(id),
      distanceOperate.deleteAreaRescueDistanceByRescueId(id),
      goodOperate.deleteRescueAllGoods(id),
      vehicleOperate.deleteRescueAllVehicle(id)
    ])
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 修改营救点
 */
rescueService.updateRescue = ({id, name, longitude, latitude, open}) => {
  return new Promise((resolve, reject) => {
    rescueOperate.updateRescue({id, name, longitude, latitude, open})
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
module.exports = rescueService
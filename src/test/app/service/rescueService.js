let rescueDao = require('../dao/rescueDao.test')

let goodOperate = require('../../../main/app/dao/goodDao')

let random = require('../common/random')

let rescueService = {}

/**
 * 增加一个物资基本信息
 * @param {String} name 物资名
 * @param {String} longitude 经度
 * @param {String} latitude 纬度
 * @param {String} isSwitch 是否开启
 */
rescueService.insertRescue = (name, longitude, latitude, isSwitch) => {
  return new Promise((resolve, reject) => {
    rescueDao.insertRescue(name, longitude, latitude, isSwitch)
    .then(value => { resolve(value) })
    .catch(e => { console.log(e) })
  })
}
/**
 * 增加物资货物信息
 */
rescueService.insertRescueGood = () => {
  return new Promise((resolve, reject) => {
    // 先查rescue,和good,然后随机数量插入
    Promise.all([rescueDao.selectAllRescue(), goodOperate.selectAllGood()])
    .then(value => {
      let allRescue = value[0]
      let allGood = value[1]
      allRescue.forEach(rescueItem => {
        allGood.forEach(goodItem => {
          rescueDao.insertRescueGood(rescueItem.id, goodItem.id, random(0,80))
          .then(value => { resolve(value)})
          .catch(e => {console.log(e)})
        })
      })
    })
  })
}
/**
 * 插入一条物资点车辆信息
 */
rescueService.insertRescueVehicle = () => {
  return new Promise((resolve, reject) => {
    // 查出所有的物资点-----(这里应该还查vehicle表,目前只有4个就不查了)
    rescueDao.selectAllRescue()
    .then(allRescue => {
      allRescue.forEach(rescueItem => {
        [1, 2, 3].forEach(vehicle_id => {
          rescueDao.insertRescueVehicle(rescueItem.id, vehicle_id, random(0, 20))
        })
      })
    })
  })
}

module.exports = rescueService
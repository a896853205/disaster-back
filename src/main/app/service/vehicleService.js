let vehicleOperate = require('../dao/vehicleDao')

let vehicleService = {}

/**
 * 获取所有车辆
 */
vehicleService.selectAllVehicle = () => {
  return new Promise((resolve, reject) => {
    vehicleOperate.selectAllVehicle()
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 查询一个营救点的所有交通工具
 */
vehicleService.selectRescueVehicle = id => {
  return new Promise((resolve, reject) => {
    vehicleOperate.selectRescueVehicle(id)
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 插入一个营救点的一个交通工具
 */
vehicleService.insertRescueVehicle = param => {
  return new Promise((resolve, reject) => {
    vehicleOperate.insertRescueVehicle(param.rescueId, param.vehicleInfo.id, param.vehicleInfo.amount)
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 删除一个营救点的一个交通工具
 */
vehicleService.deleteRescueVehicle = id => {
  return new Promise((resolve, reject) => {
    vehicleOperate.deleteRescueVehicle(id)
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**.
 * 修改一个物资点的一个交通工具
 */
vehicleService.updateRescueVehicle = param => {
  return new Promise((resolve, reject) => {
    vehicleOperate.updateRescueVehicle(param.id, param.amount)
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
module.exports = vehicleService
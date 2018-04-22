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

module.exports = vehicleService
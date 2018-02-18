let earthquakeOperate = require('../dao/earthquakeDao')

let earthquakeService = {}

/**
 * 插入地震信息情况
 */
earthquakeService.insertEarthquake = (id, area_id, collapse, strength) => {
  return new Promise((resolve, reject) => {
    earthquakeOperate.insertEarthquake(id, area_id, collapse, strength)
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

module.exports = earthquakeService
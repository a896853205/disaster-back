let areaOperate = require('../dao/areaDao')

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

module.exports = areaService
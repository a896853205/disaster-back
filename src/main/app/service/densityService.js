let densityOperate = require('../dao/densityDao')

let densityService = {}

/**
 * 获取所有人口密度系数
 */
densityService.selectAllDensity = () => {
  return new Promise((resolve, reject) => {
    densityOperate.selectAllDensity()
    .then(value => {
      resolve(value)
    })
  })
}

module.exports = densityService
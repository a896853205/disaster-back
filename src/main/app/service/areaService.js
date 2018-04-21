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
/**
 * 增加一个地区基本信息
 * @param {String} name 地区名
 * @param {String} population 地区人口
 * @param {String} density 人口密度
 * @param {String} longitude 经度
 * @param {String} latitude 纬度
 */
areaService.addArea = ({name, population, density, longitude, latitude}) => {
  // 还得增加这个地区与所有地区的距离,
  // 和所有资源点的距离
  return new Promise((resolve, reject) => {
    areaOperate.addArea({name, population, density, longitude, latitude})
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

module.exports = areaService
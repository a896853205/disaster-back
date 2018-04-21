let goodOperate = require('../dao/goodDao')

let goodService = {}

/**
 * 获取所有地点
 */
goodService.selectAllGood = () => {
  return new Promise((resolve, reject) => {
    goodOperate.selectAllGood()
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

goodService.addGoods = ({name, type_id, size, unit, weight}) => {
  return new Promise((resolve, reject) => {
    goodOperate.addGoods({name, type_id, size, unit, weight})
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

module.exports = goodService
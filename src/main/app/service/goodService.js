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

module.exports = goodService
let strengthOperate = require('../dao/strengthDao')

let strengthService = {}

/**
 * 获取所有烈度
 */
strengthService.selectAllStrength = () => {
  return new Promise((resolve, reject) => {
    strengthOperate.selectAllStrength()
    .then(value => {
      resolve(value)
    })
  })
}

module.exports = strengthService
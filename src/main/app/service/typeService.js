let typeOperate = require('../dao/typeDao')

let typeService = {}

/**
 * 获取所有类型系数
 */
typeService.selectAllTypeFactor = () => {
  return new Promise((resolve, reject) => {
    typeOperate.selectAllTypeFactor()
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

module.exports = typeService
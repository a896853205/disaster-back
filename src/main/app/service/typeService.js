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

/**
 * 查询所有类型信息(包含类型名)
 */
typeService.selectAllTypeFactorAndName = () => {
  return new Promise((resolve, reject) => {
    typeOperate.selectAllTypeName()
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
module.exports = typeService
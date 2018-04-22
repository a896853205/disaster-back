let goodOperate = require('../dao/goodDao')

let goodService = {}

/**
 * 获取所有物资
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
/**
 * 增加物资
 */
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
/**
 * 删除物资
 */
goodService.deleteGoods = id => {
  return new Promise((resolve, reject) => {
    goodOperate.deleteGoods(id)
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 修改货物
 */
goodService.updateGoods = ({id, name, type_id, size, unit, weight}) => {
  console.log(id)
  return new Promise((resolve, reject) => {
    goodOperate.updateGoods({id, name, type_id, size, unit, weight})
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
module.exports = goodService
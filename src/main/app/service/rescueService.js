let rescueOperate = require('../dao/rescueDao')

let rescueService = {}

/**
 * 获取所有营救点
 */
rescueService.selectAllRescue = () => {
  return new Promise((resolve, reject) => {
    rescueOperate.selectAllRescue()
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}

/**
 * 增加营救点 
 */
rescueService.addRescue = ({name, longitude, latitude, open}) => {
  return new Promise((resolve, reject) => {
    rescueOperate.addRescue({name, longitude, latitude, open})
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 删除营救点
 */
rescueService.deleteRescue = id => {
  // 这里还要删除所有该营救点的所有距离----------------
  // 还要删除所有营救点的车辆,和所有营救点的所有物资----
  return new Promise((resolve, reject) => {
    rescueOperate.deleteRescue(id)
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
/**
 * 修改营救点
 */
rescueService.updateRescue = ({id, name, longitude, latitude, open}) => {
  return new Promise((resolve, reject) => {
    rescueOperate.updateRescue({id, name, longitude, latitude, open})
    .then(value => {
      resolve(value)
    })
    .catch(e => {
      console.log(e)
    })
  })
}
module.exports = rescueService
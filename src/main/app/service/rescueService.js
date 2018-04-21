let rescueOperate = require('../dao/rescueDao')

let rescueService = {}

/**
 * 获取所有营救点
 */
rescueService.selectAllrescue = () => {
  return new Promise((resolve, reject) => {
    rescueOperate.selectAllrescue()
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

module.exports = rescueService
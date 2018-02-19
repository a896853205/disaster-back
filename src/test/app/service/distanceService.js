let areaService = require('../../../main/app/service/areaService')
let rescueService = require('../dao/rescueDao.test')

let distanceDao = require('../dao/distanceDao.test')
let random = require('../common/random')
let distanceService = {}

distanceService.insertDistance = () => {
  return new Promise((resolve, reject) => {
    try {
      Promise.all([areaService.selectAllArea(), rescueService.selectAllRescue()])    
      .then(value => {
        let allArea = value[0]
        let allRescue = value[1]
        let allPromise = []
        allArea.forEach(areaItem => {
          allRescue.forEach(rescueItem => {
            allPromise.push(distanceDao.insertDistance(
              rescueItem.id,
              areaItem.id,
              random(20,100),
              1
            )) 
          })
        })
        console.log(allPromise.length)
        return Promise.all(allPromise)
      })
      .then()
      .catch(e => {
        console.log(e)
      })
    } catch (error) {
      console.log(error)
    }
  })
}

module.exports = distanceService
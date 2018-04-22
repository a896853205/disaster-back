let areaService = require('../../../main/app/service/areaService')
let rescueService = require('../dao/rescueDao.test')
let areaDao = require('../dao/areaDao.test')

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
/**
 * 插入灾点与灾点之间的距离
 */
distanceService.insertAreaAreaDistance = () => {
  return new Promise((resolve, reject) => {
    areaService.selectAllArea()
    .then(allArea => {
      for (let i = 0;i < allArea.length - 1; i++) {
        for (let j = i + 1;j < allArea.length; j++) {
          let distance = random(200, 5000)
          // 正反都要插入
          areaDao.insertAreaAreaDistance(allArea[i].id, allArea[j].id, distance)
          areaDao.insertAreaAreaDistance(allArea[j].id, allArea[i].id, distance)
        }
      }
    })
  })
}

module.exports = distanceService
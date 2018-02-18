let areaService = require('../../../main/app/service/areaService')
let goodService = require('../../../main/app/service/goodService')
let needDao = require('../dao/needDao.test')
let random = require('../common/random')
let needService = {}

needService.addNeedByAreaAndGood = () => {
  return new Promise((resolve, reject) => {
    Promise.all([areaService.selectAllArea(), goodService.selectAllGood()])    
    .then(value => {
      let allArea = value[0]
      let allGood = value[1]
      allArea.forEach(areaItem => {
        allGood.forEach(goodItem => {
          return needDao.insertNeed({
            area_id: areaItem.id,
            good_id: goodItem.id,
            coeffcient: random(1, 20) / 10
          })
        })
      })
    })
    .then()
    .catch(e => {
      console.log(e)
    })
  })
}

module.exports = needService
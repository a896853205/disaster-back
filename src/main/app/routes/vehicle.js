let returnObject = require('../common/returnObject')
let vehicleService = require('../service/vehicleService')
let express = require('express')
let router = express.Router()
/**
 * 获取所有车辆
 */
router.get('/getAllVehicle', (req, res, next) => {
  let result = new returnObject()
  vehicleService.selectAllVehicle()
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      allVehicle: value
    })
  })
})

module.exports = router
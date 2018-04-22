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
/**
 * 查询一个营救点的所有交通工具
 */
router.post('/getRescueVehicle', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  vehicleService.selectRescueVehicle(param.id)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      rescueVehicle: value
    })
  })
})
/**
 * 插入一个营救点的一个交通工具
 */
router.post('/addRescueVehicle', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  vehicleService.insertRescueVehicle(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '增加营救点交通工具信息失败'
    res.json(result)
  })
})
/**
 * 删除一个营救点的一个交通工具
 */
router.post('/deleteRescueVehicle', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  vehicleService.deleteRescueVehicle(param.id)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '删除营救点交通工具信息失败'
    res.json(result)
  })
})
/**
 * 修改一个物资点的交通工具
 */
router.post('/updateRescueVehicle', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  vehicleService.updateRescueVehicle(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '修改营救点交通工具信息失败'
    res.json(result)
  })
})

module.exports = router
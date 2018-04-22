let returnObject = require('../common/returnObject')
let rescueService = require('../service/rescueService')
let express = require('express')
let router = express.Router()

/**
 * 增加营救点
 */
router.post('/addRescue', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  rescueService.addRescue(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '增加营救点基本信息失败'
    res.json(result)
  })
})

/**
 * 获取所有营救点
 */
router.get('/getAllRescue', (req, res, next) => {
  let result = new returnObject()
  rescueService.selectAllRescue()
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      allRescue: value
    })
  })
  .catch(e => {
    result.errMessage = '查询营救点基本信息失败'
    res.json(result)
  })
})

/**
 * 删除营救点
 */
router.post('/deleteRescue', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  rescueService.deleteRescue(param.id)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '删除营救点基本信息失败'
    res.json(result)
  })
})
/**
 * 修改营救点
 */
router.post('/updateRescue', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  rescueService.updateRescue(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '修改营救点基本信息失败'
    res.json(result)
  })
})
module.exports = router
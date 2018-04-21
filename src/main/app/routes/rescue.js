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

module.exports = router
let returnObject = require('../common/returnObject')
let strengthService = require('../service/strengthService')
let express = require('express')
let router = express.Router()

/**
 * 查询所有烈度信息
 */

 router.get('/getAllStrength', (req, res, next) => {
  let result = new returnObject()
  strengthService.selectAllStrength()
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      allStrength: value
    })
  })
  .catch(e => {
    result.errMessage = '查询所有烈度失败'
    res.json(result)
  })
 })

 module.exports = router
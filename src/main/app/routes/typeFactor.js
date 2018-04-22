let returnObject = require('../common/returnObject')
let typeFactorService = require('../service/typeService')
let express = require('express')
let router = express.Router()

/**
 * 查询所有类型信息(包含类型名)
 */

 router.get('/getAllTypeFactor', (req, res, next) => {
  let result = new returnObject()
  typeFactorService.selectAllTypeFactorAndName()
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      allTypeFactor: value
    })
  })
  .catch(e => {
    result.errMessage = '查询所有类型系数(包含类型名)失败'
    res.json(result)
  })
 })

 module.exports = router
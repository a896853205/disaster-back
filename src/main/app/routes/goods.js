let returnObject = require('../common/returnObject')
let goodsService = require('../service/goodService')
let express = require('express')
let router = express.Router()

/**
 * 增加货物字典
 */
router.post('/addGoods', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  goodsService.addGoods(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '增加货物基本信息失败'
    res.json(result)
  })
})

/**
 * 获取所有物资
 */
router.get('/getAllGoods', (req, res, next) => {
  let result = new returnObject()
  goodsService.selectAllGood()
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result,
      allGoods: value
    })
  })
})

module.exports = router
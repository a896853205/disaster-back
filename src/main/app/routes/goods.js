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
 * 增加一个物资点的货物
 */
router.post('/addRescueGoods', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  goodsService.addRescueGoods(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '增加营救点货物信息失败'
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
  .catch(e => {
    result.errMessage = '获取所有货物基本信息失败'
    res.json(result)
  })
})
/**
 * 获取一个营救点的所有物资
 */
router.post('/getRescueGoodsById', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  goodsService.selectRescueGoodsById(param.id)
  .then(value => {
    res.json({
      statusObj: result,
      rescueGoods: value
    })
  })
  .catch(e => {
    result.errMessage = '获取一个营救点的货物信息失败'
    res.json(result)
  })
})
/**
 * 删除一个物资点的一个物资
 */
router.post('/deleteRescueGoods', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  goodsService.deleteRescueGoods(param.id)
  .then(value => {
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '删除一个营救点的货物信息失败'
    res.json(result)
  })
})

/**
 * 删除货物
 */
router.post('/deleteGoods', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  goodsService.deleteGoods(param.id)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '删除货物基本信息失败'
    res.json(result)
  })
})
/**
 * 修改货物
 */
router.post('/updateGoods', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  goodsService.updateGoods(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '修改货物基本信息失败'
    res.json(result)
  })
})
/**
 * 修改一个物资点的货物
 */
router.post('/updateRescueGoods', (req, res, next) => {
  let result = new returnObject()
  let param = req.body
  goodsService.updateRescueGoods(param)
  .then(value => {
    result.linkSuccess()
    res.json({
      statusObj: result
    })
  })
  .catch(e => {
    result.errMessage = '修改一个物资点的货物基本信息失败'
    res.json(result)
  })
})
module.exports = router
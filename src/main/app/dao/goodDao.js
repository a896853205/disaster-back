/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-22 18:00:38
 */
let goodMapper = require('../../resources/mapper/goodMapper')
let db = require('../../resources/dbconnect')
let uuid = require('uuid')
let goodOperate = {}
/**
 * 查询所有货物
 */
goodOperate.selectAllGood = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(goodMapper.selectAllGoods, [], resolve)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 * 增加一个物资点的物资
 */
goodOperate.addRescueGoods = ({goodsInfo, rescueId}) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(goodMapper.addRescueGoods, [uuid(), rescueId, goodsInfo.id, goodsInfo.amount], resolve)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 * 获取一个物资点的所有物资 
 */
goodOperate.selectRescueGoodsById = id => {
  return new Promise((resolve, reject) => {
    try {
      db.query(goodMapper.selectRescueGoodsById, [id], resolve)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 * 增加货物
 */
goodOperate.addGoods = ({name, type_id, size, unit, weight}) =>{
  return new Promise((resolve, reject) => {
    db.query(goodMapper.insertGoods, [uuid(), name, type_id, size, unit, weight], resolve)
  })
}

/**
 * 删除物资
 */
goodOperate.deleteGoods = id => {
  return new Promise((resolve, reject) => {
    try {
      db.query(goodMapper.deleteGoods, [id], resolve)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 * 删除物资点的物资
 */
goodOperate.deleteRescueGoods = id => {
  return new Promise((resolve, reject) => {
    try {
      db.query(goodMapper.deleteRescueGoods, [id], resolve)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 * 修改货物
 */
goodOperate.updateGoods = ({id, name, type_id, size, unit, weight}) => {
  return new Promise((resolve, reject) => {
    db.query(goodMapper.updateGoods, [name, type_id, size, unit, weight, id], resolve)
  })
}
/**
 * 修改一个物资点的一个物资
 */
goodOperate.updateRescueGoods = ({id, amount}) => {
  return new Promise((resolve, reject) => {
    db.query(goodMapper.updateRescueGoods, [amount, id], resolve)
  })
}
module.exports = goodOperate
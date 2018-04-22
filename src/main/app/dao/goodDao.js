/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-22 12:59:27
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
 * 修改货物
 */
goodOperate.updateGoods = ({id, name, type_id, size, unit, weight}) => {
  return new Promise((resolve, reject) => {
    db.query(goodMapper.updateGoods, [name, type_id, size, unit, weight, id], resolve)
  })
}
module.exports = goodOperate
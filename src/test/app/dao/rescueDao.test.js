/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-19 16:49:35
 */
let rescueMapper = require('../../resources/mapper/rescueMapper.test')
let rescueGoodMapper = require('../../resources/mapper/rescueGoodMapper.test')

let db = require('../../../main/resources/dbconnect')
let uuid = require('uuid')

let rescueOperate = {}
/**
 * 增加一个物资基本信息
 * @param {String} name 物资名
 * @param {String} longitude 经度
 * @param {String} latitude 纬度
 * @param {String} isSwitch 是否开启
 */
rescueOperate.insertRescue = (name, longitude, latitude, isSwitch) => {
  return new Promise((resolve, reject) => {
    db.query(rescueMapper.insertRescue, [uuid(), name, longitude, latitude, isSwitch], resolve)
  })
}
/**
 * 查询所有物资点
 */
rescueOperate.selectAllRescue = () => {
  return new Promise((resolve, reject) => {
    db.query(rescueMapper.selectAllRescue, [], resolve)
  })
}
/**
 * 增加物资货物信息
 * @param {String} rescue_id 物资点id
 * @param {String} good_id 货物id
 * @param {Number} amount 数量
 */
rescueOperate.insertRescueGood = (rescue_id, good_id, amount) => {
  return new Promise((resolve, reject) => {
    db.query(rescueGoodMapper.insertRescueGood, [uuid(), rescue_id, good_id, amount], resolve)
  })
}
/**
 * 清除信息
 */
// areaOperate.truncate = () => {
//   return new Promise((resolve, reject)=>{
//     db.query(areaMapper.truncate, [], resolve)
//   })
// }

module.exports = rescueOperate
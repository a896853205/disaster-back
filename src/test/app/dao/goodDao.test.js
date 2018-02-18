/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 13:57:03
 */
let goodMapper = require('../../resources/mapper/goodMapper.test')
let db = require('../../../main/resources/dbconnect')
let uuid = require('uuid')

let goodOperate = {}
/**
 * 增加货物
 */
goodOperate.insertGood = ({name, type_id, size, unit, weight}) =>{
  return new Promise((resolve, reject) => {
    db.query(goodMapper.insertGood, [uuid(), name, type_id, size, unit, weight], resolve)
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

module.exports = goodOperate
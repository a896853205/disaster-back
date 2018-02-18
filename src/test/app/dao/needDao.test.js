/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 14:19:26
 */
let needMapper = require('../../resources/mapper/needMapper.test')
let db = require('../../../main/resources/dbconnect')
let uuid = require('uuid')

let needOperate = {}
/**
 * 增加地区需求系数表
 */
needOperate.insertNeed = ({area_id, good_id, coeffcient}) =>{
  return new Promise((resolve, reject) => {
    db.query(needMapper.insertNeed, [uuid(), area_id, good_id, coeffcient], resolve)
  })
}
/**
 * 清除信息
 */
needOperate.truncate = () => {
  return new Promise((resolve, reject)=>{
    db.query(needMapper.truncate, [], resolve)
  })
}

module.exports = needOperate
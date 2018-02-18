/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 16:57:53
 */
let needResultMapper = require('../../resources/mapper/needResultMapper')
let db = require('../../resources/dbconnect')
let uuid = require('uuid')
let needResultOperate = {}
/**
 * 插入需求信息
 */
needResultOperate.insertNeedResult = (earthquake_id, area_id, good_id, amount) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(needResultMapper.insertNeedResult, [uuid(), earthquake_id, area_id, good_id, amount], resolve)
    } catch (e) {
      reject(e)
    }
  });
}

module.exports = needResultOperate
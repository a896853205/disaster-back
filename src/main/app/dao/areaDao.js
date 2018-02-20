/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-19 18:40:07
 */
let areaMapper = require('../../resources/mapper/areaMapper')
let db = require('../../resources/dbconnect')
let areaOperate = {}
/**
 * 查询所有地区基本信息
 */
areaOperate.selectAllArea = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(areaMapper.selectAllArea, [], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = areaOperate
/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-19 18:43:10
 */
let distanceMapper = require('../../resources/mapper/distanceMapper')
let db = require('../../resources/dbconnect')
let distanceOperate = {}
/**
 * 查询地震地区的距离
 */
distanceOperate.selectDistanceByAreaId = area_id => {
  return new Promise((resolve, reject) => {
    try {
      db.query(distanceMapper.selectDistanceByAreaId, [area_id], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = distanceOperate
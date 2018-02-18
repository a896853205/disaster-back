/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 16:30:23
 */
let earthquakeMapper = require('../../resources/mapper/earthquakeMapper')
let db = require('../../resources/dbconnect')
let uuid = require('uuid')
let earthquakeOperate = {}
/**
 * 插入一些地震信息
 * @param {String} id 地震id
 * @param {String} area_id 地区id
 * @param {Number} collapse 坍塌系数
 * @param {Number} strength 烈度系数
 */
earthquakeOperate.insertEarthquake = (id, area_id, collapse, strength) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(earthquakeMapper.insertEarthquake, [id, area_id, collapse, strength], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = earthquakeOperate
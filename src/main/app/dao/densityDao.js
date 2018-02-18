/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-16 14:13:50
 */
let densityMapper = require('../../resources/mapper/densityMapper')
let db = require('../../resources/dbconnect')
let densityOperate = {}
/**
 * 查询所有地区基本信息
 */
densityOperate.selectAllDensity = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(densityMapper.getAllDensityFactor, [], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = densityOperate


/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 15:45:35
 */
let typeMapper = require('../../resources/mapper/typeMapper')
let db = require('../../resources/dbconnect')
let typeOperate = {}
/**
 * 查询所有类型系数
 */
typeOperate.selectAllTypeFactor = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(typeMapper.selectAllTypeFactor, ['all'], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = typeOperate
/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-20 12:51:27
 */
let rescueGoodMapper = require('../../resources/mapper/rescueGoodMapper')
let db = require('../../resources/dbconnect')
let rescueGoodOperate = {}
/**
 * 查询所有地区基本信息
 */
rescueGoodOperate.selectRescueGood = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(rescueGoodMapper.selectRescueGood, [], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = rescueGoodOperate
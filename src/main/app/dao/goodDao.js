/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 14:09:32
 */
let goodMapper = require('../../resources/mapper/goodMapper')
let db = require('../../resources/dbconnect')
let goodOperate = {}
/**
 * 查询所有货物
 */
goodOperate.selectAllGood = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(goodMapper.selectAllGoods, [], resolve)
    } catch (e) {
      reject(e)
    }
  });
}

module.exports = goodOperate
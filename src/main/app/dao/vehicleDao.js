/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-21 16:22:54
 */
let vehicleMapper = require('../../resources/mapper/vehicleMapper')
let db = require('../../resources/dbconnect')
let vehicleOperate = {}
/**
 * 查询所有交通工具
 */
vehicleOperate.selectAllVehicle = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(vehicleMapper.selectAllVehicle, [], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = vehicleOperate
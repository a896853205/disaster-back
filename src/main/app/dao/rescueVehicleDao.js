/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-21 15:39:11
 */
let rescueVehicleMapper = require('../../resources/mapper/rescueVehicleMapper')
let db = require('../../resources/dbconnect')
let rescueVehicleOperate = {}
/**
 * 查询所有物资点的交通
 */
rescueVehicleOperate.selectAllRescueVehicle = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(rescueVehicleMapper.selectAllRescueVehicle, [], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = rescueVehicleOperate
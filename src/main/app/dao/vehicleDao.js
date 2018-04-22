/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-22 20:59:14
 */
let vehicleMapper = require('../../resources/mapper/vehicleMapper')
let db = require('../../resources/dbconnect')
let uuid = require('uuid')
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
/**
 * 查询一个营救点的所有交通工具
 */
vehicleOperate.selectRescueVehicle = id => {
  return new Promise((resolve, reject) => {
    try {
      db.query(vehicleMapper.selectRescueVehicle, [id], resolve)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 * 插入一个营救点的交通工具
 */
vehicleOperate.insertRescueVehicle = (rescue_id, vehicle_id, amount) => {
  return new Promise((resolve, reject) => {
    db.query(vehicleMapper.insertRescueVehicle, [uuid(), rescue_id, vehicle_id, amount], resolve)
  })
}
/**
 * 删除一个营救点的交通工具
 */
vehicleOperate.deleteRescueVehicle = id => {
  return new Promise((resolve, reject) => {
    db.query(vehicleMapper.deleteRescueVehicle, [id], resolve)
  })
}
/**
 * 删除一个物资点的所有交通工具
 */
vehicleOperate.deleteRescueAllVehicle = id => {
  return new Promise((resolve, reject) => {
    db.query(vehicleMapper.deleteRescueAllVehicle, [id], resolve)
  })
}
/**
 * 修改一个物资点的一个交通工具
 */
vehicleOperate.updateRescueVehicle = (id, amount) => {
  return new Promise((resolve, reject) => {
    db.query(vehicleMapper.updateRescueVehicle, [amount, id], resolve)
  })
}
module.exports = vehicleOperate
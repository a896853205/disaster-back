/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-22 18:43:45
 */
let areaMapper = require('../../resources/mapper/areaMapper')
let db = require('../../resources/dbconnect')
let uuid = require('uuid')
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
/**
 * 增加一个地区基本信息
 */
areaOperate.addArea = ({areaId, name, population, density, longitude, latitude}) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(areaMapper.insertArea, [areaId, name, population, density, longitude, latitude], resolve)
    } catch (error) {
      console.log(error)
    }
  })
}
/**
 * 修改地区基本信息
 */
areaOperate.updateArea = ({id, name, population, density, longitude, latitude}) => {
  return new Promise((resolve, reject) => {
    try {
      db.query(areaMapper.updateArea, [name, population, density, longitude, latitude, id], resolve)
    } catch (error) {
      console.log(error)
    }
  })
}
/**
 * 删除地区基本信息
 */

areaOperate.deleteArea = id => {
  return new Promise((resolve, reject) => {
    try {
      db.query(areaMapper.deleteArea, [id], resolve)
    } catch (error) {
      console.log(error)
    }
  })
}
module.exports = areaOperate
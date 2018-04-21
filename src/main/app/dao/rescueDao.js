/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-21 17:24:47
 */
let rescueMapper = require('../../resources/mapper/rescueMapper')
let db = require('../../resources/dbconnect')
let uuid = require('uuid')
let rescueOperate = {}
/**
 * 查询所有货物
 */
rescueOperate.selectAllRescue = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(rescueMapper.selectAllRescue, [], resolve)
    } catch (e) {
      reject(e)
    }
  })
}

/**
 * 增加货物
 */
rescueOperate.addRescue = ({name, longitude, latitude, open}) =>{
  return new Promise((resolve, reject) => {
    db.query(rescueMapper.insertRescue, [uuid(), name, longitude, latitude, open], resolve)
  })
}

module.exports = rescueOperate
/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-22 12:18:47
 */
let rescueMapper = require('../../resources/mapper/rescueMapper')
let db = require('../../resources/dbconnect')
let uuid = require('uuid')
let rescueOperate = {}
/**
 * 查询所有营救点
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
 * 增加营救点
 */
rescueOperate.addRescue = ({name, longitude, latitude, open}) =>{
  return new Promise((resolve, reject) => {
    db.query(rescueMapper.insertRescue, [uuid(), name, longitude, latitude, open], resolve)
  })
}

/**
 * 删除营救点
 */
rescueOperate.deleteRescue = id => {
  return new Promise((resolve, reject) => {
    db.query(rescueMapper.deleteRescue, [id], resolve)
  })
}

/**
 * 修改营救点
 */
rescueOperate.updateRescue = ({id, name, longitude, latitude, open}) => {
  return new Promise((resolve, reject) => {
    db.query(rescueMapper.updateRescue, [name, longitude, latitude, open, id], resolve)
  })
}

module.exports = rescueOperate
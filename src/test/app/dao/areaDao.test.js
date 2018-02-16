/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-13 23:17:29
 */
let areaMapper = require('../../resources/mapper/areaMapper.test')
let db = require('../../../main/resources/dbconnect')
let uuid = require('uuid')

let areaOperate = {}
/**
 * 增加一个地区基本信息
 * @param {String} name 地区名
 * @param {String} population 地区人口
 * @param {String} density 人口密度
 * @param {String} longitude 经度
 * @param {String} latitude 纬度
 */
areaOperate.insertArea = ({name, population, density, longitude, latitude}) =>{
  return new Promise((resolve, reject)=>{
    db.query(areaMapper.insertArea, [uuid(), name, population, density, longitude, latitude], resolve)
  })
}
/**
 * 清除信息
 */
areaOperate.truncate = () => {
  return new Promise((resolve, reject)=>{
    db.query(areaMapper.truncate, [], resolve)
  })
}

module.exports = areaOperate
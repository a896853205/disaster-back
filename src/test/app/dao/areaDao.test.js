/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-06 20:47:00
 */
let areaMapper = require('../../resources/mapper/areaMapper.test');
let db = require('../../../main/resources/dbconnect');
let uuid = require('uuid');

let areaOperate = {};
/**
 * 增加一个地区基本信息
 * @param {*地区名} name 
 * @param {*地区人口} population 
 * @param {*人口密度} density 
 * @param {*经度} longitude 
 * @param {*纬度} latitude 
 */
areaOperate.insertArea = ({name, population, density, longitude, latitude}) =>{
  return new Promise((resolve, reject)=>{
    db.query(areaMapper.insertArea, [uuid(), name, population, density, longitude, latitude], resolve);
  });
}
/**
 * 清除信息
 */
areaOperate.truncate = () => {
  return new Promise((resolve, reject)=>{
    db.query(areaMapper.truncate, [], resolve);
  });
}

module.exports = areaOperate;
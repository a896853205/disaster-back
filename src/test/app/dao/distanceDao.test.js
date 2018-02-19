/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-19 17:48:03
 */
let distanceMapper = require('../../resources/mapper/areaRescueDistanceMapper.test')
let db = require('../../../main/resources/dbconnect')
let uuid = require('uuid')

let distanceOperate = {}

/**
 * 增加路况信息
 * @param {String} rescue_id 物资点id
 * @param {String} area_id 灾点id
 * @param {Number} distance 距离
 * @param {String} road_type_id 路况id
 */
distanceOperate.insertDistance = (rescue_id, area_id, distance, road_type_id) =>{
  return new Promise((resolve, reject) => {
    db.query(distanceMapper.insertDistance, [uuid(), rescue_id, area_id, distance, road_type_id], resolve)
  })
}

module.exports = distanceOperate
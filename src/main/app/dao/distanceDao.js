/*
 * @Author: qc
 * @Date: 2018-01-06 02:34:13 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-22 19:25:16
 */
let distanceMapper = require('../../resources/mapper/distanceMapper')
let db = require('../../resources/dbconnect')
let uuid = require('uuid')
let distanceOperate = {}
/**
 * 查询地震地区的距离
 */
distanceOperate.selectDistanceByAreaId = area_id => {
  return new Promise((resolve, reject) => {
    try {
      db.query(distanceMapper.selectDistanceByAreaId, [area_id], resolve)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 * 查询地震地区之间的距离
 */
distanceOperate.selectAllAreaAreaDistace = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(distanceMapper.selectAllAreaAreaDistace, [], resolve)
    } catch (e) {
      reject(e)
    }
  })
}
/**
 * 插入灾点与灾点之间的距离
 */
distanceOperate.insertAreaAreaDistance = (begin_area_id, end_area_id, distance) => {
  return new Promise((resolve, reject) => {
    db.query(distanceMapper.insertAreaAreaDistance, [uuid(), begin_area_id, end_area_id, distance, 1], resolve)
  })
}
/**
 * 插入灾点与物资点之间的距离
 */
distanceOperate.insertAreaRescueDistance = (rescue_id, area_id, distance) =>{
  return new Promise((resolve, reject) => {
    db.query(distanceMapper.insertAreaRescueDistance, [uuid(), rescue_id, area_id, distance, 1], resolve)
  })
}
/**
 * 删除以灾点id为开始的距离
 */
distanceOperate.deleteAreaBeginDistance = id =>{
  return new Promise((resolve, reject) => {
    db.query(distanceMapper.deleteAreaBeginDistance, [id], resolve)
  })
}
/**
 * 删除以灾点id为结束的距离
 */
distanceOperate.deleteAreaEndDistance = id =>{
  return new Promise((resolve, reject) => {
    db.query(distanceMapper.deleteAreaEndDistance, [id], resolve)
  })
}
/**
 * 删除一个灾点到所有物资点的距离(通过灾点id)
 */
distanceOperate.deleteAreaRescueDistanceByAreaId = id => {
  return new Promise((resolve, reject) => {
    db.query(distanceMapper.deleteAreaRescueDistanceByAreaId, [id], resolve)
  })
}
/**
 * 删除一个物资点到无哎呦灾点的距离(通过物资点id)
 */
distanceOperate.deleteAreaRescueDistanceByRescueId = id => {
  return new Promise((resolve, reject) => {
    db.query(distanceMapper.deleteAreaRescueDistanceByRescueId, [id], resolve)
  })
}
module.exports = distanceOperate
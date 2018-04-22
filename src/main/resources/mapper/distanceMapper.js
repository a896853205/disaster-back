module.exports = {
  // 查询地震的有关所有路径
  selectDistanceByAreaId: 'select * from d_area_rescue_distance where area_id = ?',
  // 查询所有地震之间的所有路径
  selectAllAreaAreaDistace: 'select * from d_area_area_distance',
  // 增加灾点与营救点之间的距离
  insertAreaRescueDistance: 'insert into d_area_rescue_distance (id, rescue_id, area_id, distance, road_type_id) values (?, ?, ?, ?, ?)',
  // 插入地点到地点的距离
  insertAreaAreaDistance: 'insert into d_area_area_distance (id, begin_area_id, end_area_id, distance, road_type_id) values (?, ?, ?, ?, ?)',
  // 删除以灾点id为开始的距离
  deleteAreaBeginDistance: 'delete from d_area_area_distance where begin_area_id = ?',
  // 删除以灾点id为结束的距离
  deleteAreaEndDistance: 'delete from d_area_area_distance where end_area_id = ?',
  // 删除一个灾点到所有物资点的距离(通过灾点id)
  deleteAreaRescueDistanceByAreaId: 'delete from d_area_rescue_distance where area_id = ?',
  // 删除一个物资点到无哎呦灾点的距离(通过物资点id)
  deleteAreaRescueDistanceByRescueId: 'delete from d_area_rescue_distance where rescue_id = ?'
}

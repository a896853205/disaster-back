module.exports = {
  // 查询地震的有关所有路径
  selectDistanceByAreaId: 'select * from d_area_rescue_distance where area_id = ?',
  // 查询所有地震之间的所有路径
  selectAllAreaAreaDistace: 'select * from d_area_area_distance'
}

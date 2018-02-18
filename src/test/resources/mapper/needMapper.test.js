module.exports = {
  // 增加地区需求系数表
  insertNeed: 'insert into d_need_factor (id, area_id, good_id, coeffcient) values (?, ?, ?, ?)',
  // 清除地区需求系数表
  truncate:'truncate table d_need_factor'
}

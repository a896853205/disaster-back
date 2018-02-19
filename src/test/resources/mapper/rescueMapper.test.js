module.exports = {
  // 插入物资点
  insertRescue: 'insert into d_rescue (id, name, longitude, latitude, switch) values (?, ?, ?, ?, ?)',
  // 查询物资点
  selectAllRescue: 'select * from d_rescue'
}

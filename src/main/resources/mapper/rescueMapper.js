module.exports = {
  // 查询所有的营救点
  selectAllRescue: 'select * from d_rescue',
  // 增加营救点
  insertRescue: 'insert into d_rescue (id, name, longitude, latitude, switch) values (?, ?, ?, ?, ?)',
  // 修改营救点
  updateRescue: 'update d_rescue set name = ?, longitude = ?, latitude = ?, switch = ? where id = ?',
  // 删除营救点
  deleteRescue: 'delete from d_rescue where id = ?'
}

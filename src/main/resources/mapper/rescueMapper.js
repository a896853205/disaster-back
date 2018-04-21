module.exports = {
  // 查询所有的营救点
  selectAllRescue: 'select * from d_rescue',
  // 增加营救点
  insertRescue: 'insert into d_rescue (id, name, longitude, latitude, switch) values (?, ?, ?, ?, ?)'
}

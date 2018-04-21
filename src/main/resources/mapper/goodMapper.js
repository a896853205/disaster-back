module.exports = {
  // 查询所有货物
  selectAllGoods: 'select * from d_good',
  // 增加物资
  insertGoods: 'insert into d_good (id, name, type_id, size, unit, weight) values (?, ?, ?, ?, ?, ?)',
  // 修改物资
  updateGoods: 'update d_good set name = ?, type_id = ?, size = ?, unit = ?, weight = ? where id = ?',
  // 删除物资
  deleteGoods: 'delete from d_good where id = ?'
}

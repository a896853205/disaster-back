module.exports = {
  // 查询所有货物
  selectAllGoods: 'select d_good.id, d_good.name, type_id, size, unit, weight, d_type.name as typeName from d_good, d_type where d_good.type_id = d_type.id',
  // 获取一个物资点的所有物资
  selectRescueGoodsById: 'select d_rescue_good.id, d_good.id as goodId, d_good.name, d_good.size, d_good.unit, d_good.weight, d_rescue_good.amount, d_type.name as typeName from d_good, d_rescue_good, d_type where d_good.id = d_rescue_good.good_id and d_rescue_good.rescue_id = ? and d_type.id = d_good.type_id',
  // 增加一个物资点的一种物资
  addRescueGoods: 'insert into d_rescue_good (id, rescue_id, good_id, amount) values (?, ?, ?, ?)',
  // 增加物资
  insertGoods: 'insert into d_good (id, name, type_id, size, unit, weight) values (?, ?, ?, ?, ?, ?)',
  // 修改物资
  updateGoods: 'update d_good set name = ?, type_id = ?, size = ?, unit = ?, weight = ? where id = ?',
  // 修改一个物资点的物资
  updateRescueGoods: 'update d_rescue_good set amount = ? where id = ?',
  // 删除物资
  deleteGoods: 'delete from d_good where id = ?',
  // 删除一个物资点的物资
  deleteRescueGoods: 'delete from d_rescue_good where id = ?'
}

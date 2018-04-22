module.exports = {
  // 查询所有交通工具
  selectAllVehicle: 'select * from d_vehicle',
  // 查询在一个物资点的交通工具
  selectRescueVehicle: 'select d_rescue_vehicle.id, d_vehicle.name, d_vehicle.load, d_rescue_vehicle.rescue_id, d_rescue_vehicle.vehicle_id, d_rescue_vehicle.amount from d_vehicle, d_rescue_vehicle where d_vehicle.id = d_rescue_vehicle.vehicle_id and d_rescue_vehicle.rescue_id = ?',
  // 插入一个物资点的交通工具
  insertRescueVehicle: 'insert into d_rescue_vehicle (id, rescue_id, vehicle_id, amount) values (?, ?, ?, ?)',
  // 删除一个物资点的交通工具
  deleteRescueVehicle: 'delete from d_rescue_vehicle where id = ?',
  // 删除一个物资点的所有交通工具
  deleteRescueAllVehicle: 'delete from d_rescue_vehicle where rescue_id = ?',
  // 修改一个物资点的交通工具
  updateRescueVehicle: 'update d_rescue_vehicle set amount = ? where id = ?'
}

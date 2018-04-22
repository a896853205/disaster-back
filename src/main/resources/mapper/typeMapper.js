module.exports = {
  // 查询所有种类系数
  selectAllTypeFactor: 'select * from d_type_factor where area_id = ?',
  // 查询所有种类名
  selectAllTypeName: 'select d_type.name,d_type_factor.area_id,d_type_factor.coeffcient from d_type,d_type_factor where d_type_factor.type_id = d_type.id'
}

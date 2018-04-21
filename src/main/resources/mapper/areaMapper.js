/*
 * @Author: qc
 * @Date: 2018-01-06 02:30:56 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-04-21 16:38:44
 */
module.exports = {
  // 增加地区基本情况
  insertArea:'insert into d_area (id,name,population,density,longitude,latitude) values (?,?,?,?,?,?)',
  // 查询所有地区的基本情况
  selectAllArea: 'select * from d_area order by name',
  // 修改地区的基本情况
  updateArea: 'update d_area set name = ?,population = ?,density = ?,longitude = ?,latitude = ? where id = ?',
  // 删除地区的基本情况
  deleteArea: 'delete from d_area where id = ?'
}
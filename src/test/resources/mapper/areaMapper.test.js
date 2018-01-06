/*
 * @Author: qc
 * @Date: 2018-01-06 02:30:56 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-06 20:44:39
 */
module.exports = {
  // 增加地区基本情况
  insertArea:'insert into d_area (id,name,population,density,longitude,latitude) values (?,?,?,?,?,?)',
  // 删除所有地区基本情况
  truncate:'truncate table d_area'
}
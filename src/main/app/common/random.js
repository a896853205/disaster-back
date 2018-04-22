/*
 * @Author: qc
 * @Date: 2018-01-06 18:19:01 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-06 18:31:31
 */
/**
 * 在指定上下限中取随机数
 * @param {*下限} under
 * @param {*上限} top 
 */
module.exports = (under, top) =>{
  let diff = top - under;
  return Math.floor(Math.random() * diff) + under;
}
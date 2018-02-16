/*
 * @Author: qc
 * @Date: 2018-01-03 14:49:56 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-12 23:30:13
 */
module.exports = class resultObject {
  constructor () {
    // 状态码 (1为正确,0为错误)
    this.status = 0
    // 错误信息
    this.errMessage = ''
  }
  /**
   * 链接操作成功函数
   */
  linkSuccess () {
    this.status = 1
  }
  /**
   * 判断自己链接是否成功
   * @returns {Boolean} true是成功,false是失败
   */
  isSuccess () {
    return this.status ? true : false
  }
}
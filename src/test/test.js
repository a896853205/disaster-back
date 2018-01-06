/*
 * @Author: qc
 * @Date: 2018-01-06 12:41:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-06 21:08:47
 */
let assert = require('assert');
let area = require('./webapp/area.test');
// 插入100个灾区
describe('灾区', () => {
  it('灾区先清除再插入', () => {
    // 先清除
    area.truncate().then(() => {
      // 再增加
      for(let i = 10;i < 100;i++){
        area.insert('10'+i);
      }
    });
  });
});
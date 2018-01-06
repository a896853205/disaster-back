/*
 * @Author: qc
 * @Date: 2018-01-06 12:41:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-06 19:20:10
 */
let assert = require('assert');
let area = require('./webapp/area');
// 插入100个灾区
describe('灾区', () => {
  it('灾区插入', (done) => {
    for(let i = 10;i < 100;i++){
      area('10'+i);
    }
    done();
  });
});
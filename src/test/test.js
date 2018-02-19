/*
 * @Author: qc
 * @Date: 2018-01-06 12:41:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-19 17:39:15
 */
let assert = require('assert');
let area = require('./webapp/area.test')
let good = require('./webapp/good.test')
let rescue = require('./webapp/rescue.test')
let distance = require('./webapp/distance.test')

let goodList = require('./data/goodList')
let uuid = require('uuid')
// 插入100个灾区
describe('灾区', () => {
  // it('灾区先清除再插入', () => {
  //   // 先清除
  //   area.truncate()
  //   .then(() => {
  //     // 再增加
  //     for (let i = 10; i < 100; i++) {
  //       area.insert('10'+i)
  //     }
  //   })
  // })
  // it ('增加虚拟物品()', () => {
  //   // 增加应急物资...
  //   good.foodInsert(goodList)
  // })
  // it ('增加物资点', () => {
  //   for (let i = 10; i < 100; i++) {
  //     rescue.insert('10' + i)
  //   }
  // })
  // it ('增加物资点物资', () => {
  //   rescue.insertGood()
  // })
  it ('路况增加', () => {
    distance.distanceInsert()
  })
})
/*
 * @Author: qc
 * @Date: 2018-01-06 12:41:18 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 14:06:06
 */
let assert = require('assert');
let area = require('./webapp/area.test')
let good = require('./webapp/food.test')
let uuid = require('uuid')
// 插入100个灾区
describe('灾区', () => {
  // it('灾区先清除再插入', () => {
  //   // 先清除
  //   area.truncate()
  //   .then(() => {
  //     // 再增加
  //     for (let i = 0; i < 100; i++) {
  //       area.insert('10'+i)
  //     }
  //   })
  // })
  // it ('增加虚拟物品()', () => {
  //   // 增加应急物资...
  //   let foodList = [{
  //     name: '通信基站',
  //     type_id: 1,
  //     size: '3m',
  //     unit: '台',
  //     weight: 5
  //   }, {
  //     name: '对讲机',
  //     type_id: 1,
  //     size: '0.5m',
  //     unit: '部',
  //     weight: 0.8
  //   }, {
  //     name: '矿泉水',
  //     type_id: 1,
  //     size: '500ml',
  //     unit: '箱',
  //     weight: 12
  //   }, {
  //     name: '面包',
  //     type_id: 1,
  //     size: '200g',
  //     unit: '箱',
  //     weight: 8
  //   }, {
  //     name: '锹',
  //     type_id: 1,
  //     size: '2m',
  //     unit: '把',
  //     weight: 1
  //   }, {
  //     name: '镐',
  //     type_id: 1,
  //     size: '1m',
  //     unit: '把',
  //     weight: 1.5
  //   }]
  //   good.foodInsert(foodList)
  // })
  it ('增加地区需求系数表', () => {
    good.areaNeedInsert()
  })
})
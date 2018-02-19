/*
 * @Author: qc
 * @Date: 2018-01-06 17:56:20
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-19 16:54:47
 */
let random = require('../app/common/random')
let axios = require('axios')
let baseUrl = 'http://localhost:3000'
let rescueOperator = {}
/** 
 * 增加一个物资基本信息
 */
rescueOperator.insert = name => {
  
  let insertParam = {
    name: name,
    longitude: '97°21′',
    latitude: '26°03′',
    switch: '1'
  }
  axios.post(`${baseUrl}/test/rescue/insert`,insertParam)
  .then(res => {})
  .catch(e => {
    console.log(e)
  })
}
/**
 * 增加一个物资基本物资信息
 */
rescueOperator.insertGood = () => {
  axios.post(`${baseUrl}/test/rescue/goodInsert`)
  .then(res => {})
  .catch(e => {
    console.log(e)
  })
}
/**
 * 清除所有地区
 */
// rescueOperator.truncate = () => {
//   return new Promise((resolve, reject) => {
//     axios.get(`${baseUrl}/test/area/truncate`)
//     .then(res => {
//       resolve()
//     })
//     .catch(e => {
//       console.log(e)
//     })
//   })
// }

module.exports = rescueOperator

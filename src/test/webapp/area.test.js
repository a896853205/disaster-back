/*
 * @Author: qc
 * @Date: 2018-01-06 17:56:20
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 00:13:11
 */
let random = require('../app/common/random')
let axios = require('axios')
let baseUrl = 'http://localhost:3000'
let areaOperator = {}
/** 
 * 发起增加灾点基本情况请求
 */
areaOperator.insert = name => {
  let insertParam = {
    name: '1001',
    population: random(120000000, 130000000),
    density: random(30, 800),
    longitude: '97°21′',
    latitude: '26°03′'
  }
  insertParam.name = name
  axios.post(`${baseUrl}/test/area/insert`,insertParam)
  .then(res => {})
  .catch(e => {
    console.log(e)
  })
}
/**
 * 清除所有地区
 */
areaOperator.truncate = () => {
  return new Promise((resolve, reject) => {
    axios.get(`${baseUrl}/test/area/truncate`)
    .then(res => {
      resolve()
    })
    .catch(e => {
      console.log(e)
    })
  })
}

module.exports = areaOperator

/*
 * @Author: qc
 * @Date: 2018-02-16 22:45:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-19 17:48:40
 */
let random = require('../app/common/random')
let axios = require('axios')
let baseUrl = 'http://localhost:3000'
let uuid = require('uuid')
let distanceOperator = {}

distanceOperator.distanceInsert = () => {
  // 插入即可
  axios.post(`${baseUrl}/test/distance/insert`)
  .then(res => {
    console.log('post结束')
  })
  .catch(e => {
    console.log(e)
  })
}

module.exports = distanceOperator

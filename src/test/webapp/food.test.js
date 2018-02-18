/*
 * @Author: qc
 * @Date: 2018-02-16 22:45:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 14:19:09
 */
let random = require('../app/common/random')
let axios = require('axios')
let baseUrl = 'http://localhost:3000'
let uuid = require('uuid')
let foodOperator = {}

foodOperator.foodInsert = (foodList) => {
  
  // 插入即可-----------------
  foodList.forEach(insertParam => {
    axios.post(`${baseUrl}/test/good/insert`,insertParam)
    .then(res => {})
    .catch(e => {
      console.log(e)
    })
  })
}

foodOperator.areaNeedInsert = () => {
  axios.post(`${baseUrl}/test/need/truncate`)
  .then(() => {
    return axios.post(`${baseUrl}/test/need/needInsert`)
  })
  .then(res => {})
  .catch(e => {
    console.log(e)
  })
}

foodOperator.truncate = () => {

}

module.exports = foodOperator

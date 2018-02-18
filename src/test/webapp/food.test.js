/*
 * @Author: qc
 * @Date: 2018-02-16 22:45:37 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-02-18 11:46:08
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
  // 查询所有的区域,
  // 查询应急物资表,
}

foodOperator.truncate = () => {

}

module.exports = foodOperator

/*
 * @Author: qc 
 * @Date: 2018-01-06 12:09:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-06 20:49:05
 */

let areaOperate = require('../../app/dao/areaDao.test');
let result = require('../../../main/app/common/returnObject');
let express = require('express');
let router = express.Router();
/**
 * 增加地区基本信息
 */
router.post('/area/insert',(req, res, next)=>{
  let area = req.body;
  areaOperate.insertArea(area).then(() => {
    // 成功时返回1
    result.status = 1;
    res.json(result);
  }).catch((err)=>{
    // 未成功时直接返回
    result.errMessage = '灾区基本情况插入未成功';
    res.json(result);
  });
});
/**
 * 清除地区基本信息表
 */
router.get('/area/truncate',(req, res, next) => {
  areaOperate.truncate().then(() => {
    // 成功返回1
    result.status = 1;
    res.json(result);
  }).catch((err)=>{
    // 未成功时直接返回
    result.errMessage = '灾区基本情况表清理未成功';
    res.json(result);
  });
});
module.exports = router;

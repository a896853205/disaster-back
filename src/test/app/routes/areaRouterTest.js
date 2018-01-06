/*
 * @Author: qc 
 * @Date: 2018-01-06 12:09:36 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-01-06 19:00:44
 */

let areaOperate = require('../../../main/app/dao/areaDao');
let result = require('../../../main/app/common/returnObject');
let express = require('express');
let router = express.Router();

router.post('/area/insert',(req, res, next)=>{
  let area = req.body;
  areaOperate.insertArea(area).then(()=>{
    // 成功时返回0
    result.status = 1;
    res.json(result);
  }).catch((err)=>{
    // 未成功时直接返回
    result.errMessage = '灾区基本情况插入未成功';
    res.json(result);
  });
});

module.exports = router;

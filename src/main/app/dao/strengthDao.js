let strengthMapper = require('../../resources/mapper/strengthMapper');
let db = require('../../resources/dbconnect')
let strengthOperate = {}
/**
 * 查询所有烈度信息
 */
strengthOperate.selectAllStrength = () => {
  return new Promise((resolve, reject) => {
    try {
      db.query(strengthMapper.getAllStrength, [], resolve);
    } catch (e) {
      reject(e)
    }
  })
}

module.exports = strengthOperate;
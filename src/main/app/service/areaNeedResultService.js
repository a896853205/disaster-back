let distanceOperate = require('../dao/distanceDao')
let rescueGoodDao = require('../dao/rescueGoodDao')

let areaNeedResultService = {}

/**
 * 获取所有地点
 */
areaNeedResultService.getAreaNeed = Djk => {
  return new Promise((resolve, reject) => {
    // 参数为地震id.循环查出所有distance.然后排序
    let areaArr = []
    let isHasArea = false
    Djk.forEach(item => {
      isHasArea = false
      areaArr.forEach(areaItem => {
        if (item.area_id === areaItem) {
          isHasArea = true
        }
      })
      if (!isHasArea) {
        areaArr.push(item.area_id)
      }
    })
    let PromiseArr = []
    // 还得查询这些物资点的所有货物
    PromiseArr.push(rescueGoodDao.selectRescueGood())
    areaArr.forEach(area_id => {
      PromiseArr.push(distanceOperate.selectDistanceByAreaId(area_id))
    })
    // 查询所有距离
    let allDistance = []
    // 所有物资
    let allGoods = []
    Promise.all(PromiseArr)
    .then(value => {
      allGoods = value.splice(0, 1)[0]
      value.forEach(distanceItem => {
        allDistance = allDistance.concat(distanceItem)
      })
      // 距离从小到大排序
      allDistance.sort((one, two) => {
        return one.distance - two.distance
      })
      let areaNeedResult = []
      for (let i = 0;i < allDistance.length;i++) {
        // 取出这个距离的物资点的所有物资.
        let allGoodsInRescue = getGoodsInRescue(allDistance[i].rescue_id, allGoods)
        // 和灾点的所有需要的物资
        let allGoodsInArea = getGoodsInArea(allDistance[i].area_id, Djk)
        allGoodsInArea.forEach(areaGoodItem => {
          allGoodsInRescue.forEach(rescueGoodItem => {
            if (areaGoodItem.good_id === rescueGoodItem.good_id) {
              // 需要为0的时候不记录
              if (areaGoodItem.needNum !== 0) {
                // 判断是库存大,还是需求大
                if (rescueGoodItem.amount >= areaGoodItem.needNum) {
                  // 记录获取物资的数量
                  let getNum = areaGoodItem.needNum
                  rescueGoodItem.amount = rescueGoodItem.amount - areaGoodItem.needNum
                  areaGoodItem.needNum = 0
                  // 记录物资点号,灾点号,物资号,(area的)数量
                  areaNeedResult.push({
                    rescue_id: rescueGoodItem.rescue_id,
                    rescue_name: rescueGoodItem.rescue_name,
                    area_id: areaGoodItem.area_id,
                    area_name: areaGoodItem.area_name,
                    good_id: areaGoodItem.good_id,
                    amount: getNum
                  })
                } else {
                  // 记录获取物资的数量
                  let getNum = rescueGoodItem.amount
                  areaGoodItem.needNum = areaGoodItem.needNum - rescueGoodItem.amount
                  rescueGoodItem.amount = 0
                  // 记录物资点号,灾点号,物资号,(rescue的)数量
                  areaNeedResult.push({
                    rescue_id: rescueGoodItem.rescue_id,
                    rescue_name: rescueGoodItem.rescue_name,
                    area_id: areaGoodItem.area_id,
                    area_name: areaGoodItem.area_name,
                    good_id: areaGoodItem.good_id,
                    amount: getNum
                  })
                }
              }
            }
          })
        })
        // 把截出来的所有物资信息放回去
        allGoods = allGoods.concat(allGoodsInRescue)
        Djk = Djk.concat(allGoodsInArea)
        let isHas = false
        console.log(Djk)
        Djk.forEach(need => {
          if (need.needNum !== 0) {
            isHas = true
          }
        })
        if (!isHas) {
          break
        }
      }
      // 这个是要的结果
      console.log(areaNeedResult)
      // 最后循环判断allGoodsInArea的amount是否都等于0,不等于0弄出来
      console.log(Djk)
      let unPut = []
      Djk.forEach(need => {
        if (need.needNum !== 0) {
          unPut.push(need)
        }
      })
      resolve({
        areaNeedResult,
        unPut
      })
    })
  })
}
/**
 * 获取指定物资点所有物资(截出来)
 * @param {String} rescue_id 营救点id
 * @param {Array} allGoods 所有营救点有的所有物资
 */
function getGoodsInRescue (rescue_id, allGoods) {
  let allGoodsInRescue = []
  allGoods.forEach((goodItem, index) => {
    if (goodItem.rescue_id === rescue_id) {
      allGoodsInRescue.push(allGoods.splice(index, 1)[0])
    }
  })
  return allGoodsInRescue
}
/**
 * 获取灾区点所有需求物资(截出来)
 * @param {String} area_id 灾区id
 * @param {Array} Djk 各灾区需求
 */
function getGoodsInArea (area_id, Djk) {
  let allGoodsInArea = []
  Djk.forEach((goodItem, index) => {
    if (goodItem.area_id === area_id) {
      allGoodsInArea.push(Djk.splice(index, 1)[0])
    }
  })
  return allGoodsInArea
}

module.exports = areaNeedResultService
let goodDao = require('../dao/goodDao')
let rescueVehicleDao = require('../dao/rescueVehicleDao')
let vehicleDao = require('../dao/vehicleDao')
let distanceDao = require('../dao/distanceDao')

let areaUpLoadService = {}

/**
 * 灾区加载货物
 */
areaUpLoadService.areaUpLoad = areaNeedResult => {
  return new Promise((resolve, reject) => {
    // 查询所有物品信息
    Promise.all([goodDao.selectAllGood(), rescueVehicleDao.selectAllRescueVehicle(), vehicleDao.selectAllVehicle(), distanceDao.selectAllAreaAreaDistace()])
    .then(value => {
      console.log('查询成功')
      let allGood = value[0]
      let allrescueVehicle = value[1]
      let allVehicle = value[2]
      let allAreaAreaDistance = value[3]
      let settleNeedArr = []
      let upLoadArr = []
      areaNeedResult.forEach(needItem => {
        let isHasArea = false
        settleNeedArr.forEach(settleItem => {
          if (settleItem.area_id === needItem.area_id) {
            isHasArea = true
            // 而且插入物资点信息
            // 遍历物资信息
            let isHasRescue = false
            settleItem.rescueArr.forEach(rescueItem => {
              if (rescueItem.rescue_id === needItem.rescue_id) {
                isHasRescue = true
                // 遍历详细信息数组
                // 这里还得选出匹配的优先级插入到详细信息中-------------------------------
                // 修改成对象形式-----------------------------
                rescueItem.goodArr.push({
                  good_id: needItem.good_id,
                  amount: needItem.amount,
                  type_id: getGoodType(needItem.good_id, allGood)
                })
              }
            })
            if (!isHasRescue) {
              // 这里修改成对象----------------------------------
              settleItem.rescueArr.push({
                rescue_id: needItem.rescue_id,
                goodArr: [{
                  good_id: needItem.good_id,
                  amount: needItem.amount,
                  type_id: getGoodType(needItem.good_id, allGood)
                }]
              })
            }
          }
        })
        if (!isHasArea) {
          // 这里可以变成构造对象-------------------
          settleNeedArr.push({
            area_id: needItem.area_id,
            rescueArr: [{
              rescue_id: needItem.rescue_id,
              goodArr: [{
                good_id: needItem.good_id,
                amount: needItem.amount,
                type_id: getGoodType(needItem.good_id, allGood)
              }]
            }]
          })
        }
      })
      // 然后按照每个物资的优先级排序
      settleNeedArr.forEach(areaItem => {
        areaItem.rescueArr.forEach(resuceItem => {
          resuceItem.goodArr.sort((one, two) => {
            return one.type_id - two.type_id
          })
        })
      })
      try {
        for (let i = 0; i < settleNeedArr.length; i++) {
          for(let j = 0; j < settleNeedArr[i].rescueArr.length; j++) {
            let A = adjtrans(settleNeedArr[i].rescueArr[j].rescue_id, allrescueVehicle, allVehicle)
            if (A === '-1') {
              continue
            }
            // 这里调用main
            main (A, 0, 0, 1, settleNeedArr, allGood, allAreaAreaDistance, upLoadArr)
          }
        }
      } catch (error) {
        console.log(error)
      }
      console.log(upLoadArr.length)
      // upLoadArr.forEach((upLoadItem, index) => {
      //   if (upLoadItem.amount === 0) {
      //     upLoadArr.splice(index, 1)
      //   }
      // })
    })
  })
}
/**
 * 第三阶段的主函数
 * @param {*} A 
 * @param {*} allArea 
 * @param {*} level 
 */
function main (A, area_index, rescue_index, level, allArea, allGood, allAreaAreaDistance, upLoadArr) {
  for (let goodIndex = 0;goodIndex < allArea[area_index].rescueArr[rescue_index].goodArr.length;goodIndex++) {
    let goodItem = getGoodObject(allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].good_id, allGood)
    if (A.surplus > goodItem.weight * allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].amount) {
      let loadNum = allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].amount
      A.surplus = A.surplus - goodItem.weight * allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].amount
      allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].amount = 0
      // 记录------------A,物资点号,物资号,数量,灾点号,优先级.
      if (loadNum !== 0) {
        upLoadArr.push({
          vehicle_id: A.id,
          vehicle_name: A.name,
          rescue_id: allArea[area_index].rescueArr[rescue_index].rescue_id,
          area_id: allArea[area_index].area_id,
          good_id: allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].good_id,
          amount: loadNum,
          level
        })
      }
      if (goodIndex === allArea[area_index].rescueArr[rescue_index].goodArr.length - 1 && (A.surplus < parseInt(A.load / 3 + ''))) {
        seek_next(A, area_index, rescue_index, level + 1, allArea, allGood, allAreaAreaDistance, upLoadArr)
      }
    } else {
      // 记录------------A, 物点号,物资号,数量优先级,灾点号
      for(var amount = allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].amount; amount * goodItem.weight < A.surplus; amount--) {}
      allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].amount = allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].amount - amount
      upLoadArr.push({
        vehicle_id: A.id,
        vehicle_name: A.name,
        rescue_id: allArea[area_index].rescueArr[rescue_index].rescue_id,
        area_id: allArea[area_index].area_id,
        good_id: allArea[area_index].rescueArr[rescue_index].goodArr[goodIndex].good_id,
        amount,
        level
      })
      break
    }
  }
}
/**
 * 查询去下一个灾点
 * @param {*} A 
 * @param {*} area_index 
 * @param {*} rescue_index 
 * @param {*} level 
 */
function seek_next(A, area_index, rescue_index, level, allArea, allGood, allAreaAreaDistance, upLoadArr) {
  // 查询所有灾点之间的距离
  // 然后筛出来由allArea[area_index]开的的所有距离
  let wantAreaDistance = []
  allAreaAreaDistance.forEach(areaAreaDistanceItem => {
    if (areaAreaDistanceItem.begin_area_id === allArea[area_index].area_id) {
      wantAreaDistance.push(areaAreaDistanceItem)
    }
  })
  // 以距离排序
  wantAreaDistance.sort((one, two) => {
    return one.distance - two.distance
  })
  wantAreaDistance.forEach(areaItem => {
    // 如果都为0就下一个灾点
    for (let areaIndex = 0;areaIndex < allArea.length; areaIndex++) {
      let detailItem = allArea[areaIndex]
      if (areaItem.end_area_id === detailItem.area_id) {
        detailItem.resuceArr.forEach(rescueItem => {
          if (rescueItem.rescue_id === allArea[area_index].rescueArr[rescue_index].rescue_id) {
            // 看这个灾点有自己的物资点需要的货物没有(循环rescueArr判断,amount === 0)
            let isEmpty = true
            rescueItem.goodArr.forEach(goodItem => {
              if (goodItem.amount !== 0) {
                isEmpty = false
              }
            })
            // 确定后调用main
            if (!isEmpty) {
              return main(A, area_index, rescue_index, level, allArea, allGood, allAreaAreaDistance, upLoadArr)
            }
          }
        })
      }
    }
  })
}
/**
 * 判断交通工具
 * @param {String} rescue_id 物资点id
 * @param {Array} allrescueVehicle 所有物资点的交通工具
 * @param {Array} allVehicle 所有交通工具
 */
function adjtrans (rescue_id, allrescueVehicle, allVehicle) {
  let rescueVehicle = []
  // 挑出单独的几个
  allrescueVehicle.forEach((vehicleItem, index) => {
    if (vehicleItem.rescue_id === rescue_id) {
      rescueVehicle.push(allrescueVehicle.splice(index, 1)[0])
    }
  })
  // 按照交通顺序排序
  rescueVehicle.sort((one, two) => {
    return one.vehicle_id - two.vehicle_id
  })
  for (let i = 0;rescueVehicle.length;i++) {
    if (rescueVehicle[i].amount > 0) {
      rescueVehicle[i].amount--
      allrescueVehicle.concat(rescueVehicle)
      return getVehicleObject(i + 1 + '', allVehicle)
    }
  }
  allrescueVehicle.concat(rescueVehicle)
  // 没有交通
  return '-1'
}
/**
 * 获得交通工具对象
 * @param {String} vehicle_id 交通工具id
 * @param {Array} allVehicle 所有交通工具情况
 */
function getVehicleObject (vehicle_id, allVehicle) {
  let vehicle = {}
  allVehicle.forEach(vehicleItem => {
    if (vehicle_id === vehicleItem.id) {
      // vehicleItem.surplus = vehicleItem.load
      // 这里改成深度复制--------------------------
      // 暂时使用四个if
      if (vehicleItem.id === '1') {
        vehicle = {
          id: '1',
          name: '直升飞机',
          load: 500,
          surplus: 500
        }
      } else if (vehicleItem.id === '2') {
        vehicle = {
          id: '2',
          name: '无人机',
          load: 200,
          surplus: 200
        }
      } else if (vehicleItem.id === '3') {
        vehicle = {
          id: '3',
          name: '汽车',
          load: 400,
          surplus: 400
        }
      } else if (vehicleItem.id === '4') {
        vehicle = {
          id: '4',
          name: '船',
          load: 200,
          surplus: 200
        }
      }
    }
  })
  return vehicle
}
/**
 * 获得货物对象
 * @param {String} good_id 货物id
 * @param {Array} goodArr 所有货物的数组
 */
function getGoodObject (good_id, goodArr) {
  let good = {}
  goodArr.forEach(goodItem => {
    if (goodItem.id === good_id) {
      good = goodItem
    }
  })
  return good
}
/**
 * 得到货物的类型(四种其中一个)
 * @param {String} good_id 物资id
 * @param {Array} goodArr 所有物资的数组
 */
function getGoodType (good_id, goodArr) {
  let type_id = undefined
  goodArr.forEach(goodItem => {
    if (goodItem.id === good_id) {
      type_id = goodItem.type_id
    }
  })
  return type_id
}

module.exports = areaUpLoadService
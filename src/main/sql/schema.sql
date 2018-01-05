/*
Navicat MySQL Data Transfer

Source Server         : myself
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : disaster

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2018-01-06 01:19:10
*/

SET FOREIGN_KEY_CHECKS=0;
-- ----------------------------
-- Table structure for `b_earthquake`
-- ----------------------------
DROP TABLE IF EXISTS `b_earthquake`;
CREATE TABLE `b_earthquake` (
  `id` char(32) NOT NULL COMMENT '编号',
  `area_id` char(32) DEFAULT NULL COMMENT '地区编号',
  `collapse` float(255,0) DEFAULT NULL COMMENT '倒塌系数',
  `strength_id` char(32) DEFAULT NULL COMMENT '烈度id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='地震信息表';

-- ----------------------------
-- Records of b_earthquake
-- ----------------------------

-- ----------------------------
-- Table structure for `b_need_result`
-- ----------------------------
DROP TABLE IF EXISTS `b_need_result`;
CREATE TABLE `b_need_result` (
  `id` char(32) NOT NULL COMMENT '编号',
  `earthquake_id` char(32) DEFAULT NULL COMMENT '地震编号',
  `area_id` char(32) DEFAULT NULL COMMENT '地区编号',
  `good_id` char(32) DEFAULT NULL COMMENT '物资编号',
  `amout` float(255,0) DEFAULT NULL COMMENT '数量',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='需求信息表';

-- ----------------------------
-- Records of b_need_result
-- ----------------------------

-- ----------------------------
-- Table structure for `d_area`
-- ----------------------------
DROP TABLE IF EXISTS `d_area`;
CREATE TABLE `d_area` (
  `id` char(32) NOT NULL COMMENT '编号',
  `name` varchar(255) DEFAULT NULL COMMENT '地区名',
  `population` float(255,0) DEFAULT NULL COMMENT '人口总数',
  `density` float(255,0) DEFAULT NULL COMMENT '人口密度',
  `longitude` varchar(255) DEFAULT NULL COMMENT '经度',
  `latitude` varchar(255) DEFAULT NULL COMMENT '纬度',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='地区基本情况表';

-- ----------------------------
-- Records of d_area
-- ----------------------------

-- ----------------------------
-- Table structure for `d_density_factor`
-- ----------------------------
DROP TABLE IF EXISTS `d_density_factor`;
CREATE TABLE `d_density_factor` (
  `id` char(32) NOT NULL COMMENT '编号',
  `begin` float(255,0) DEFAULT NULL COMMENT '下限',
  `end` float(255,0) DEFAULT NULL COMMENT '上限',
  `coeffcient` float(255,0) DEFAULT NULL COMMENT '系数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='人口密度系数表';

-- ----------------------------
-- Records of d_density_factor
-- ----------------------------

-- ----------------------------
-- Table structure for `d_good`
-- ----------------------------
DROP TABLE IF EXISTS `d_good`;
CREATE TABLE `d_good` (
  `id` char(32) NOT NULL COMMENT '编号',
  `name` varchar(255) DEFAULT NULL COMMENT '物资名',
  `type_id` char(3) DEFAULT NULL COMMENT '种类id',
  `size` varchar(255) DEFAULT NULL COMMENT '规格',
  `unit` varchar(255) DEFAULT NULL COMMENT '单位',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='应急物资表';

-- ----------------------------
-- Records of d_good
-- ----------------------------

-- ----------------------------
-- Table structure for `d_need_factor`
-- ----------------------------
DROP TABLE IF EXISTS `d_need_factor`;
CREATE TABLE `d_need_factor` (
  `id` char(32) NOT NULL COMMENT '编号',
  `area_id` char(32) DEFAULT NULL COMMENT '地区编号',
  `good_id` char(32) DEFAULT NULL COMMENT '物资编号',
  `coeffcient` float(255,0) DEFAULT NULL COMMENT '系数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='地区需求系数表';

-- ----------------------------
-- Records of d_need_factor
-- ----------------------------

-- ----------------------------
-- Table structure for `d_strength_factor`
-- ----------------------------
DROP TABLE IF EXISTS `d_strength_factor`;
CREATE TABLE `d_strength_factor` (
  `id` char(32) NOT NULL COMMENT '编号',
  `level` varchar(255) DEFAULT NULL COMMENT '等级',
  `coeffcient` float(255,0) DEFAULT NULL COMMENT '系数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='烈度系数表';

-- ----------------------------
-- Records of d_strength_factor
-- ----------------------------

-- ----------------------------
-- Table structure for `d_type`
-- ----------------------------
DROP TABLE IF EXISTS `d_type`;
CREATE TABLE `d_type` (
  `id` char(32) NOT NULL COMMENT '编号',
  `name` varchar(255) DEFAULT NULL COMMENT '种类名',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='种类表';

-- ----------------------------
-- Records of d_type
-- ----------------------------

-- ----------------------------
-- Table structure for `d_type_factor`
-- ----------------------------
DROP TABLE IF EXISTS `d_type_factor`;
CREATE TABLE `d_type_factor` (
  `id` char(32) NOT NULL COMMENT '编号',
  `area_id` char(32) DEFAULT NULL COMMENT '地区编号',
  `type_id` char(3) DEFAULT NULL COMMENT '种类id',
  `coeffcient` float(255,0) DEFAULT NULL COMMENT '系数',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='需求种类系数表';

-- ----------------------------
-- Records of d_type_factor
-- ----------------------------

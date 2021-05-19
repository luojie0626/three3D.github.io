// 引入three.js
import * as THREE from '../../../three.js-r123/build/three.module.js';
// 引入lon2xyz,经纬度转球面坐标
import { lon2xyz } from './math.js'

import config from './config.js'
var R = config.R;//地球半径

var loader = new THREE.FileLoader();//three.js文件加载类FileLoader：封装了XMLHttpRequest
loader.setResponseType('json');
var group = new THREE.Group();
loader.load('airports.json', function (data) {
  var coordArr = data;//所有经纬度坐标数据
  var verticesArr = [];//所有顶点数据，三个元素为一组
  for (var i = 0; i < coordArr.length; i++) {
    var lon = coordArr[i].longitude_deg;//经度
    var lat = coordArr[i].latitude_deg//纬度
    // 经纬度转球面坐标
    var coord = lon2xyz(R*1.001, lon, lat)
    verticesArr.push(coord.x, coord.y, coord.z);

    // 实际开发中遇到几何体顶点坐标NaN报错问题
    // if(!coordArr[i].longitude_deg)console.log('存在空数据')
    // if(coordArr[i].longitude_deg){
    //   var lon = coordArr[i].longitude_deg;//经度
    //   var lat = coordArr[i].latitude_deg//纬度
    //   var coord = lon2xyz(R*1.001, lon, lat)
    //   verticesArr.push(coord.x, coord.y, coord.z);  
    // }
  }
  var geometry = new THREE.BufferGeometry(); //创建一个Buffer类型几何体对象
  //3个为一组，表示一个顶点的xyz坐标
  var attribute = new THREE.BufferAttribute(new Float32Array(verticesArr), 3);
  // console.log('顶点数据',attribute.count);//接近6万个点
  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribute;
  // 点渲染模式
  var material = new THREE.PointsMaterial({
    // color: 0x33ffcc,
    color: 0xffff00,
    size: 1.0, //点尺寸
    // size: 1.5, //点尺寸
  }); //材质对象
  var points = new THREE.Points(geometry, material); //点模型对象
  group.add(points);
})

export default group;